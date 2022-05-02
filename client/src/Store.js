import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '../src/context/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';


const Store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk),
))

export default Store