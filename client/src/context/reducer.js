import { combineReducers } from 'redux'
import authReducer from './authReducer' 


export const reducer = combineReducers({
    auth: authReducer
})



