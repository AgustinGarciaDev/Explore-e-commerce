const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'UPDATE_CATEGORY':
            return {
                ...state,
                products: state.products.map(product => {
                    if (product._id === action.payload._id) {
                        product = action.payload
                    }
                    return product
                })
            }

        default:
            return state
    }
}

export default productReducer