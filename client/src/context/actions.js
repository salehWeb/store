import * as actionTypes from './actionTypes'
import * as API from '../server/index'

export const getCard = () => async (dispatch) => {
    try {
        const DATA = await API.getCard()
        dispatch({ type: actionTypes.GETCARD, payload: DATA })
    } catch (error) {
        console.log(error);
    }
}

export const postCard = (data) => async (dispatch) => {
    try {
        if (data) {
            await API.postCard(data)
            dispatch({ type: actionTypes.POSTCARD, payload: { msg: 'the data was successfuly saved in data base' } })
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.POSTCARD, payload: { msg: 'Request failed Place try agin' } })
    }
}

