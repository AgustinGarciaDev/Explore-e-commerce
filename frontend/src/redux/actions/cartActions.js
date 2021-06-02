import axios from "axios";

const cartActions = {
    allProducts: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://explore-2021.herokuapp.com/api/products')
                const Data = [...response.data.result]
                Data.map((article) => {
                    article["units"] = 0
                    article["status"] = false
                })
                if (localStorage.getItem("cart")) {
                    const response = JSON.parse(localStorage.getItem("cart"))
                    dispatch({ type: 'PRODUCTS', payload: response })
                    return response
                } else {
                    if (response) {
                        if (response.data.success) {
                            dispatch({ type: 'PRODUCTS', payload: Data })
                            return Data
                        } else {
                            return Data
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    buyArticle: (product) => {
        return (dispatch, getState) => {
            dispatch({ type: 'BUY', payload: product })
        }
    },
    removeArticle: (product) => {
        return (dispatch, getState) => {
            dispatch({ type: 'REMOVE', payload: product })
        }
    },
    subtract: (product) => {
        return (dispatch, getState) => {
            dispatch({ type: 'SUBTRACT', payload: product })
        }
    },
    localStorage: (response) => {
        return (dispatch, getState) => {
            dispatch({ type: 'PRODUCTS', payload: response })
        }
    },
    localStorageNum: (response) => {
        return (dispatch, getState) => {
            dispatch({ type: 'NUM_CART', payload: response })
        }
    }
}

export default cartActions