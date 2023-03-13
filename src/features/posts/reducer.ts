import {api, apiType, PostType} from '../../api/api'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../app/store'

const initialState = {items: [] as PostType[]}

type postsActions = ReturnType<typeof fetchPostsSuccess> | ReturnType<typeof updatePostSuccess>
export const postsReducer = (state = initialState, action: postsActions) => {
    switch (action.type) {
        case 'POSTS/FETCH-POSTS-SUCCESS': {
            return {...state, items: action.payload.posts}
        }
        case 'POSTS/UPDATE-POST-SUCCESS': {
            return {
                ...state,
                items: state.items.map(i => i.id === action.payload.postId ? {...i, text: action.payload.text} : i)
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostType[]) => ({type: 'POSTS/FETCH-POSTS-SUCCESS', payload: {posts}} as const)
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
        const posts = await api.updatePost(postId, text)
        dispatch(updatePostSuccess(postId, text))
    }