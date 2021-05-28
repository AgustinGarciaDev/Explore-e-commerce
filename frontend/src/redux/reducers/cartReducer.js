const initialState = {
    articles: [],
    accountant: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY':
            console.log(action.payload)
            return {
                ...state,
                articles: action.payload,
                accountant: + 1
            }
            break
        default:
            return state
    }
}

export default cartReducer