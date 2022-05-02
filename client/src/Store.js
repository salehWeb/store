import { legacy_createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '../src/context/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const initalState = {
    auth: localStorage.getItem('user') !== undefined
        ? JSON.parse(localStorage.getItem('user'))
        : {}
}

const Store = legacy_createStore(reducer, {}, composeWithDevTools(
    applyMiddleware(thunk),
))

export default Store