const initialState = {
    articles: [],
    item: [],
    cart: [],
    accountant: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY':
            if (state.cart.includes(action.payload)) {
                return {
                    ...state,
                    accountant: state.accountant + 1
                }
            } else {
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