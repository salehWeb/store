import * as actionTypes from './actionTypes'
import * as API from '../server/index'

export const getCard = () => async (dispatch) => {
    try {
        const data = await API.getCard()
        dispatch({ type: actionTypes.GETCARD, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const postCard = (data) => async (dispatch) => {
    try {
        if (data) {
            const res = await API.postCard(data)
            dispatch({ type: actionTypes.POSTCARD, payload: { msg: res } })
            setTimeout(function() {
                dispatch({ type: actionTypes.POSTCARD, payload: null })
            }, 5000)
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.POSTCARD, payload: { msg: 'Request failed Place try agin' + error.message } })
    }
}
