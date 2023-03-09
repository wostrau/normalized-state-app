import React from 'react'
import {Post} from '../features/posts/components/Post'
import {useSelector} from 'react-redux'

type PostPagePropsType = {}

export const PostPage: React.FC<PostPagePropsType> = (props) => {
    const items = useSelector(state => state.posts.items)

    return (
        <div>
            {items.map(i => <Post post={i}/>)}
        </div>
    )
}