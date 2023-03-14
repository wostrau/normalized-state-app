export type AuthorAPIType = {
    id: number
    name: string
}

export type CommentAPIType = {
    id: number
    text: string
    author: AuthorAPIType
}

export type PostAPIType = {
    id: number
    text: string
    likes: number
    author: AuthorAPIType
    lastComments: CommentAPIType[]
}

export type apiType = typeof api

export const api = {
    getPosts(): Promise<PostAPIType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        text: 'I am on duty today',
                        likes: 5,
                        author: {
                            id: 1,
                            name: 'Sanya'
                        },
                        lastComments: [
                            {id: 9, text: 'Thanks, bro', author: {id: 1, name: 'Sanya'}},
                            {id: 8, text: 'Cool staff!', author: {id: 2, name: 'Garry'}}
                        ]
                    },
                    {
                        id: 2,
                        text: 'London is the capital of Great Britain',
                        likes: 7,
                        author: {
                            id: 2,
                            name: 'Garry'
                        },
                        lastComments: [
                            {id: 11, text: 'Truth)', author: {id: 1, name: 'Sanya'}},
                            {id: 10, text: 'Right!', author: {id: 1, name: 'Sanya'}}
                        ]

                    },
                    {
                        id: 3,
                        text: 'The  weather is good today',
                        likes: 10,
                        author: {
                            id: 1,
                            name: 'Sanya'
                        },
                        lastComments: [
                            {id: 7, text: 'Forecast may be wrong(', author: {id: 2, name: 'Garry'}},
                            {id: 6, text: 'Hope so', author: {id: 2, name: 'Garry'}},
                            {id: 5, text: 'Do you think so?', author: {id: 3, name: 'Coby'}}
                        ]
                    }
                ])
            }, 2000)
        })
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    getComments(postId: number): Promise<CommentAPIType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {id: 7, text: 'But forecast may be wrong(', author: {id: 2, name: 'Garry'}},
                    {id: 6, text: 'Hope so', author: {id: 2, name: 'Garry'}},
                    {id: 5, text: 'Do you think so?', author: {id: 3, name: 'Coby'}},
                    {id: 4, text: 'Do you really believe it?', author: {id: 1, name: 'Sanya'}},
                    {id: 3, text: '20 degrees above zero!', author: {id: 2, name: 'Garry'}}
                ])
            }, 2000)
        })
    },
    deleteComment(postId: number, commentId: number) {
        return Promise.resolve({})
    }
}
