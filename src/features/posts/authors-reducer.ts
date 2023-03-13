import {api, apiType, AuthorAPIType, PostsAPIType} from '../../api/api'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../app/store'
import {mapToLookupTable} from './posts-reducer'

const initialState = {
    byId: {} as { [key: string]: AuthorAPIType }
}

type StateType = typeof initialState

type authorsActions = ReturnType<typeof fetchPostsSuccess>

export const authorsReducer = (state = initialState, action: authorsActions): StateType => {
    switch (action.type) {
        case 'POSTS/FETCH-POSTS-SUCCESS': {
            return {
                ...state,
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostsAPIType[]) => ({
    type: 'POSTS/FETCH-POSTS-SUCCESS',
    payload: {posts}
} as const)

export type postsDispatch = ThunkDispatch<AppStateType, apiType, authorsActions>

export const fetchPosts = () =>
    async (dispatch: postsDispatch) => {
        const posts = await api.getPosts()
        dispatch(fetchPostsSuccess(posts))
    }
