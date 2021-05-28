const initialState = {
    articles: [],
    item: [],
    cart: [],
    accountant: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY':
            return {
                cart: [...state.cart,action.payload],
                accountant: state.accountant + 1
            }
            break
        case 'REMOVE':
            return {
                cart: state.cart.filter( article => article._id !== action.payload._id ),
                accountant: state.accountant - 1
            }
            break
        case 'ADD':
            return {
                accountant: state.accountant + 1
            }
            break
        case 'SUBTRACT':
            return {
                accountant: state.accountant - 1
            }
            break
        default:
            return state
    }
}

export default cartReducer