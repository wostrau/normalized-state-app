import {api, apiType, AuthorAPIType, PostAPIType} from '../../api/api'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../app/store'
import {mapToLookupTable} from './posts-reducer'
import {fetchCommentsSuccess} from './comments-reducer'

const initialState = {
    byId: {} as { [key: string]: AuthorAPIType }
}

type StateType = typeof initialState

type authorsActions = ReturnType<typeof fetchPostsSuccess> | ReturnType<typeof fetchCommentsSuccess>

export const authorsReducer = (state = initialState, action: authorsActions): StateType => {
    switch (action.type) {
        case 'POSTS/FETCH-POSTS-SUCCESS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts.map(p => p.author)),
                    ...mapToLookupTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
                }
            }
        }
        case 'COMMENTS/FETCH-COMMENTS-SUCCESS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.comments.map(c => c.author))
                }
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostAPIType[]) => ({
    type: 'POSTS/FETCH-POSTS-SUCCESS',
    payload: {posts}
} as const)

export type postsDispatch = ThunkDispatch<AppStateType, apiType, authorsActions>

export const fetchPosts = () =>
    async (dispatch: postsDispatch) => {
        const posts = await api.getPosts()
        dispatch(fetchPostsSuccess(posts))
    }
