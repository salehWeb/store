import * as actionType from './actionTypes'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                ...state
            };
        case actionType.GET_USER:
            return { ...state, user: JSON.parse(localStorage.getItem('user')) }
        case actionType.LOGOUT:
            localStorage.removeItem('user')
            return { user: null }
        case actionType.LOGIN_USER:
            return {
                ...state,
                userMsg: action.payload
            }
        case actionType.GET_LOGIN:
            return {
                ...state,
                userMsg: action.payload
            }
        default: return state
    }
}

export default reducer