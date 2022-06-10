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

export const getItemPageData = (item, history) => (dispatch) => {
    history(`/item?id=${item._id}`)
    dispatch({ type: actionTypes.SET_ITEM_PAGE, payload: item }) 
}