import { combineReducers } from 'redux'
import authReducer from './authReducer'
import cardReducer from './cardReducer' 


export const reducer = combineReducers({
    auth: authReducer,
    card: cardReducer
})



