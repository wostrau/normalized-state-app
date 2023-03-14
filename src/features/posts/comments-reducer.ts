import {api, apiType, CommentAPIType, PostAPIType} from '../../api/api'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../app/store'
import {mapToLookupTable} from './posts-reducer'

export type CommentType = Omit<CommentAPIType, 'author'> & { authorId: number }

const initialState = {
    byId: {} as { [key: string]: CommentType }
}

type StateType = typeof initialState

type commentsActions =
    ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof fetchCommentsSuccess>
    | ReturnType<typeof deleteCommentSuccess>

export const commentsReducer = (state = initialState, action: commentsActions): StateType => {
    switch (action.type) {
        case 'POSTS/FETCH-POSTS-SUCCESS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts
                        .map(p => p.lastComments)
                        .flat()
                        .map(c => {
                            const commentCopy: CommentType = {
                                id: c.id,
                                text: c.text,
                                authorId: c.author.id
                            }
                            return commentCopy
                        })
                    )
                }
            }
        }
        case 'COMMENTS/FETCH-COMMENTS-SUCCESS': {
            const lookupTable = mapToLookupTable(action.payload.comments.map(c => {
                const commentCopy: CommentType = {
                    id: c.id,
                    text: c.text,
                    authorId: c.author.id
                }
                return commentCopy
            }))
            return {
                ...state,
                byId: {...state.byId, ...lookupTable}
            }
        }
        case 'COMMENTS/DELETE-COMMENT-SUCCESS': {
            const byIdCopy = {...state.byId}
            delete byIdCopy[action.payload.commentId]
            return {...state, byId: byIdCopy}
        }
    }
    return state
}


export const fetchPostsSuccess = (posts: PostAPIType[]) => ({
    type: 'POSTS/FETCH-POSTS-SUCCESS',
    payload: {posts}
} as const)

export const fetchCommentsSuccess = (postId: number, comments: CommentAPIType[]) => ({
    type: 'COMMENTS/FETCH-COMMENTS-SUCCESS',
    payload: {postId, comments}
} as const)

export const deleteCommentSuccess = (postId: number, commentId: number) => ({
    type: 'COMMENTS/DELETE-COMMENT-SUCCESS',
    payload: {postId, commentId}
} as const)


export type commentsDispatch = ThunkDispatch<AppStateType, apiType, commentsActions>

export const fetchComments = (postId: number) =>
    async (dispatch: commentsDispatch) => {
        const comments = await api.getComments(postId)
        dispatch(fetchCommentsSuccess(postId, comments))
    }

export const deleteComment = (postId: number, commentId: number) =>
    async (dispatch: commentsDispatch) => {
        const result = await api.deleteComment(postId, commentId)
        dispatch(deleteCommentSuccess(postId, commentId))
    }
