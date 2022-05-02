import * as actionTypes from './actionTypes'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.POSTCARD:
            console.log(action.payload);
            return {
                ...state,
                data: action.payload
            };
            case actionTypes.GETCARD:
                return {
                    ...state,
                    data: action.payload
                };
        default: return state
    }
}

export default reducer