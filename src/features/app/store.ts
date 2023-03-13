import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import {postsDispatch, postsReducer} from '../posts/posts-reducer'
import {useDispatch} from 'react-redux'
import {authorsReducer} from '../posts/authors-reducer'

let rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<postsDispatch>()