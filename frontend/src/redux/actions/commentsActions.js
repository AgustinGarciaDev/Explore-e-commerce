import axios from 'axios'

const commentsActions = {
    products: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                if (response) {
                    if (response.data.success) {
                        return response.data.result 
                    } else {
                        return response.data.result 
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    },
    fetchComments: (info, id) => {
        return async (dispatch, getState) => {
            try {
                var response = await axios.post('http://localhost:4000/api/products/comments/' + id, info, {
                    headers: {
                        'Authorization': 'Bearer ' + info.token
                    }
                })
                if (response.data.success) {
                    return response.data.result.comments
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    deleteComment: (idComment, idArticle) => {
        return async (dispatch, getState) => {
            var response = await axios.delete(`http://localhost:4000/api/products/comments/${idArticle}/${idComment}`) 
            if (response.data.success) {
                console.log(response.data.result )
                return response.data.result.comments
            }
        }
    },
    updateComment: (info , idArticle , idComment) => {
        return async (dispatch, getState) => {
            var response = await axios.put(`http://localhost:4000/api/products/comments/${idArticle}/${idComment}`, info) 
            if (response.data.success) {
                return response.data.result.comments
            }
        }
    }
}

export default commentsActions