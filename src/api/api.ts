export type AuthorType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    text: string
    likes: number
    author: AuthorType
}

export type apiType = typeof api

export const api = {
    getPosts(): Promise<PostType[]> {
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
                        }
                    },
                    {
                        id: 2,
                        text: 'London is the capital of Great Britain',
                        likes: 7,
                        author: {
                            id: 2,
                            name: 'Garry'
                        }

                    },
                    {
                        id: 3,
                        text: 'The  weather is good today',
                        likes: 10,
                        author: {
                            id: 3,
                            name: 'Toby'
                        }
                    }
                ])
            }, 2000)
        })
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    }
}
