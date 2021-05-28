import axios from "axios";

const cartActions = {
    allProducts: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                if (response) {
                    if (response.data.success) {
                        return response.data
                    } else {
                        return response.data
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    buyArticle: (id) => {
        return (dispatch, getState) => {
            dispatch({ type: 'BUY' })
        }
    },
}

export default cartActions