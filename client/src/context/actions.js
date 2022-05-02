import * as actionTypes from './actionTypes'
import * as API from '../server/index'

export const getCard = () => async (dispatch) => {
    try {
        const data = await API.getCard()
        dispatch({ type: actionTypes.GETCARD, payload: data })
    } catch (error) {
        dispatch({ type: actionTypes.GETCARD, payload: error })
        console.log(error);
    }
}

export const postCard = (data) => async (dispatch) => {
    try {
        if (data) {
            const res = await API.postCard(data)
            dispatch({ type: actionTypes.POSTCARD, payload: { msg: res } })
            setTimeout(() => {
                dispatch({ type: actionTypes.POSTCARD, payload: { msg: '' } })
            }, 5000)
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.POSTCARD, payload: { msg: 'Request failed Place try agin' } })
    }
}

