import * as actionType from './actionTypes'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            console.log(action.payload)
            return {
                ...state,
                user: action.payload
            }
        default: return state
    }
}

export default reducer