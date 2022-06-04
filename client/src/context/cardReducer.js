import * as actionTypes from './actionTypes'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.POSTCARD:
            return {
                ...state,
                msg: action.payload
            };
        case actionTypes.GETCARD:
            return {
                ...state,
                data: action.payload.data
            };
        case actionTypes.SET_CARD:
            return {
                ...state,
                cards: JSON.parse(localStorage.getItem('cardItems')) || JSON.stringify(localStorage.setItem('cardItems', '[]'))
            }
        case actionTypes.SET_TOTAL:
            return {
                ...state,
                total: action.payload
            }
        case actionTypes.GET_SEARCH:
            return {
                ...state,
                search: action.payload,
                isSearching: true
            }
        case actionTypes.REST_SAERCH:
            return {
                ...state,
                search: [],
                isSearching: false
            }
        case actionTypes.REST_CARD_ITEMS:
            JSON.stringify(localStorage.setItem('cardItems', '[]'))
            return {
                ...state,
                cards: []
            }
        default: return state
    }
}

export default reducer