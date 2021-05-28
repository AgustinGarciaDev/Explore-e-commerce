import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import userReducer from './userReducer'
import productReducer from './productReducer'

const mainReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    productReducer
})

export default mainReducer