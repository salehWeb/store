import * as actionTypes from './actionTypes'
import * as API from '../server/index'

export const getCard = () => async (dispatch) => {
    try {
        const DATA = await API.getCard()
        dispatch({ type: actionTypes.POSTCARD, payload: DATA })
    } catch (error) {
        console.log(error);
    }
}

export const postCard = (data) => async (dispatch) => {
    try {
        const DATA = await API.postCard(data)
        dispatch({ type: actionTypes.POSTCARD, payload: DATA })
    } catch (error) {
        console.log(error);
    }
}

