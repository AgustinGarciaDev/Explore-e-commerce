const initialState = {
    articles: [],
    item: [],
    cart: [],
    accountant: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS':
            return {
                ...state,
                articles: action.payload
            }
            break
        case 'BUY':
            if (state.cart.filter(article => article._id === action.payload._id).length > 0) {
                console.log("entro al if")
                state.articles.map(article => {
                    if(article._id === action.payload._id) {
                        console.log(article.units)
                        article.units = article.units + 1
                    }
                    return article
                })
                return {
                    ...state,
                    accountant: state.accountant + 1
                }
            } else {
                console.log("entro al else")
                state.articles.map(article => {
                    if(article._id === action.payload._id) {
                        article.units = 1
                    /*     article.units = article.units + 1 */
                    }
                    return article
                })
                return {
                    ...state,
                    cart: [...state.cart,action.payload],
                    accountant: state.accountant + 1
                }
            }
            break
        case 'REMOVE':
            return {
                ...state,
                cart: state.cart.filter( article => article._id !== action.payload._id ),
                accountant: state.accountant - 1
            }
            break
        case 'ADD':
            return {
                ...state,
                accountant: state.accountant + 1
            }
            break
        case 'SUBTRACT':
            return {
                ...state,
                accountant: state.accountant - 1
            }
            break
        default:
            return state
    }
}

export default cartReducer