import * as actionType from './actionTypes'


const reducer = (state = {}, action, user) => {
    switch (action.type) {
        case actionType.SET_USER:
            user = JSON.parse(localStorage.getItem('user')) || action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                ...state,
                user
            };
            case actionType.LOGOUT:
                localStorage.removeItem('user')
                return { user: null }
        default: return state
    }
}

export default reducer