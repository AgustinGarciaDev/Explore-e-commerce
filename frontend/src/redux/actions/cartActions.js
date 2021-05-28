import axios from "axios";

const cartActions = {
    buyArticle: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                const Data = [...response.data.result]
                Data.map((article) => {
                    article["status"] = true
                    article["internalCounter"] = 0
                })
                if (response.data.success) {
                    Data.map((article) => {
                        if (article._id === id) {
                            article.status = false   
                        }
                    })
                    dispatch({ type: 'BUY', payload: Data  })
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}

export default cartActions