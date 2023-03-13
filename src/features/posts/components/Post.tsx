import React from 'react'
import {PostType} from '../../../api/api'

export const Post: React.FC<{ post: PostType }> = (props) => {
    return (
        <div>
            <b>{props.post.author.name}</b>
            <span>{props.post.text}</span>
            <hr/>
        </div>
    )
}