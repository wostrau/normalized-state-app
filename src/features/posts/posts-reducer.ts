import {api, apiType, PostsAPIType} from '../../api/api'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../app/store'

export type PostsType = {
    id: number
    text: string
    likes: number
    authorId: number
}

const initialState = {
    //items: [] as PostType[],
    allIds: [] as number[],
    byId: {} as { [key: string]: PostsType }
}

type LookupTableType<T> = { [key: string]: T }

export const mapToLookupTable = <T extends { id: number }>(items: T[]): LookupTableType<T> => {
    const acc: LookupTableType<T> = {}
    return items.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, acc)
}

type postsActions = ReturnType<typeof fetchPostsSuccess> | ReturnType<typeof updatePostSuccess>

export const postsReducer = (state = initialState, action: postsActions) => {
    switch (action.type) {
        case 'POSTS/FETCH-POSTS-SUCCESS': {
            return {
                ...state,
                //items: action.payload.posts,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookupTable(action.payload.posts.map(p => {
                    const postCopy: PostsType = {
                        id: p.id,
                        text: p.text,
                        likes: p.likes,
                        authorId: p.author.id
                    }
                    return postCopy
                }))
            }
        }
        case 'POSTS/UPDATE-POST-SUCCESS': {
            return {
                ...state,
                //items: state.items.map(i => i.id === action.payload.postId ? {...i, text: action.payload.text} : i)
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
                }
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostsAPIType[]) => ({
    type: 'POSTS/FETCH-POSTS-SUCCESS',
    payload: {posts}
} as const)
export const updatePostSuccess = (postId: number, text: string) => ({
    type: 'POSTS/UPDATE-POST-SUCCESS',
    payload: {postId, text}
} as const)

export type postsDispatch = ThunkDispatch<AppStateType, apiType, postsActions>

export const fetchPosts = () =>
    async (dispatch: postsDispatch) => {
        const posts = await api.getPosts()
        dispatch(fetchPostsSuccess(posts))
    }
export const updatePost = (postId: number, text: string) =>
    async (dispatch: postsDispatch) => {
        await api.updatePost(postId, text)
        dispatch(updatePostSuccess(postId, text))
    }