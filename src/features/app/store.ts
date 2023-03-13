import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import {postsDispatch, postsReducer} from '../posts/reducer'
import {useDispatch} from 'react-redux'

let rootReducer = combineReducers({posts: postsReducer})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<postsDispatch>()