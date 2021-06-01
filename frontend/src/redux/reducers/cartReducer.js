const initialState = {
    articles: [],
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
            const buy = state.articles.map(article => {
                if(article._id === action.payload._id) {
                    article.status = true
                    article.units = article.units + 1
                }
                return article
            })
            localStorage.setItem('cart', JSON.stringify(buy))
            return {
                ...state,
                articles: buy
            }
            break
        case 'REMOVE':
            const remove = state.articles.map(article => {
                if(article._id === action.payload._id) {
                    article.status = false
                    article.units = article.units + 1
                }
                return article
            })
            localStorage.clear()
            return {
                ...state,
                articles: remove
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