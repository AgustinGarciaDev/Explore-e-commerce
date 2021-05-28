const initialState = {
    articles: [],
    cart: [],
    accountant: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY':
            console.log(action.payload)
            return {
                ...state,
                cart: action.payload,
                accountant: initialState.accountant ++
            }
            break
        default:
            return state
    }
}

export default cartReducer