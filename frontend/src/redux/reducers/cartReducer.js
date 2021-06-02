const initialState = {
    articles: [],
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
                if (article._id === action.payload._id) {
                    article.status = true
                    article.units = article.units + 1
                }
                return article
            })
            localStorage.setItem('cart', JSON.stringify(buy))
            localStorage.setItem('num', JSON.stringify(state.accountant + 1))
            return {
                ...state,
                articles: buy,
                accountant: state.accountant + 1
            }
            break
        case 'REMOVE':
            var cont = 0
            const remove = state.articles.map(article => {
                if (article._id === action.payload._id) {
                    article.status = false
                    cont = article.units
                    article.units = 0
                }
                return article
            })
            localStorage.setItem('cart', JSON.stringify(remove))
            localStorage.setItem('num', JSON.stringify(state.accountant - cont))
            return {
                ...state,
                articles: remove,
                accountant: state.accountant - cont
            }
            break
        case 'SUBTRACT':
            const subtract = state.articles.map(article => {
                if (article._id === action.payload._id) {
                    article.units = article.units - 1
                }
                return article
            })
            localStorage.setItem('cart', JSON.stringify(subtract))
            localStorage.setItem('num', JSON.stringify(state.accountant - 1))
            return {
                ...state,
                accountant: state.accountant - 1
            }
            break
        case 'NUM_CART':
            return {
                ...state,
                accountant: action.payload
            }
            break
        default:
            return state
    }
}

export default cartReducer