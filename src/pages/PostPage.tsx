import React, {useEffect} from 'react'
import {Post} from '../features/posts/components/Post'
import {useSelector} from 'react-redux'
import {AppStateType, useAppDispatch} from '../features/app/store'
import {fetchPosts} from '../features/posts/reducer'


export const PostPage: React.FC = (props) => {
    const items = useSelector((state: AppStateType) => state.posts.items)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div>
            {items.map(i => <Post key={i.id} post={i}/>)}
        </div>
    )
}