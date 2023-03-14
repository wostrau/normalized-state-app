import React from 'react'
import {useSelector} from 'react-redux'
import {AppStateType, useAppDispatch} from '../../app/store'
import {deleteComment} from '../comments-reducer'

export const Comment: React.FC<{ id: number, postId: number }> = ({id, postId}) => {
    const comment = useSelector((state: AppStateType) => state.comments.byId[id])
    const author = useSelector((state: AppStateType) => state.authors.byId[comment.authorId])
    const dispatch = useAppDispatch()

    return (
        <li>
            <b>{author.name} </b>
            said: {comment.text}
            <button onClick={() => dispatch(deleteComment(postId, id))}>x</button>
        </li>
    )
}