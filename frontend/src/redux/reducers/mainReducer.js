import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default mainReducer