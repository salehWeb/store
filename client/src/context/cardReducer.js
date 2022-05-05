import * as actionTypes from './actionTypes'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.POSTCARD:
            console.log(action.payload);
            return {
                ...state,
                msg: action.payload
            };
            case actionTypes.GETCARD:
                return {
                    ...state,
                    data: action.payload.data
                };
        default: return state
    }
}

export default reducer