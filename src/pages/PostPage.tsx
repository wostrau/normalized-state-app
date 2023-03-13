import React, {useEffect} from 'react'
import {Post} from '../features/posts/components/Post'
import {useSelector} from 'react-redux'
import {AppStateType, useAppDispatch} from '../features/app/store'
import {fetchPosts} from '../features/posts/posts-reducer'


export const PostPage: React.FC = (props) => {
    const ids = useSelector((state: AppStateType) => state.posts.allIds)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div>
            {ids.map(id => <Post key={id} postId={id}/>)}
        </div>
    )
}