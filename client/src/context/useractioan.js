import * as actionTypes from './actionTypes'
import * as API from '../server/index'

export const Sing_in = (data) => async (dispatch) => {
    try {
        const isOk = await API.setUser(data)

        dispatch({ type: actionTypes.LOGIN_USER, payload: { msg: isOk } })
    } catch (error) {
        console.log(error)
    }
}

export const login = (data) => async (dispatch) => {
    try {
        const isOk = await API.getUser(data)

        dispatch({ type: actionTypes.GET_LOGIN, payload: { msg: isOk } })
    } catch (error) {
        console.log(error)
    }
}