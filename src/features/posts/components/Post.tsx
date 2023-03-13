import React, {useState} from 'react'
import {AppStateType, useAppDispatch} from '../../app/store'
import {updatePost} from '../posts-reducer'
import {useSelector} from 'react-redux'

export const Post: React.FC<{ postId: number }> = ({postId}) => {
    const post = useSelector((state: AppStateType) => state.posts.byId[postId])
    const author = useSelector((state: AppStateType) => state.authors.byId[post.authorId])

    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(post.text)
    const dispatch = useAppDispatch()

    return (
        <div>
            <b>{author.name}</b>
            <br/>
            {editMode
                ? <textarea
                    onChange={(e) => setText(e.currentTarget.value)}
                    onBlur={() => {
                        dispatch(updatePost(post.id, text))
                        setEditMode(false)
                    }}
                >{text}</textarea>
                : <span
                    onDoubleClick={() => setEditMode(true)}
                >{post.text}</span>}
            <br/>
            likes: {post.likes}
            <hr/>
        </div>
    )
}