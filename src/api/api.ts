export const api = {
    getPosts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {id: 1, post: 'I am on duty today', likes: 5},
                    {id: 2, post: 'London is the capital of Great Britain', likes: 7},
                    {id: 3, post: 'The  weather is good today', likes: 10}
                ])
            }, 2000)
        })
    }
}
