import * as actionTypes from './actionTypes'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.POSTCARD:
            return {
                ...state,
                data: action.payload
            };
        default: return state
    }
}

export default reducer