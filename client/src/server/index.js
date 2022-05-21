import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const getCard = async () => await API.get(`/`)

export const postCard = async (data) => await API.post(`/creatItem`, data).then((res) => {
    return res.statusText
}).catch((err) => {
    console.log(err);
    return err.message
})

export const getImage = async (id) => await API.get(`/images/${id}`).then((res) => {
    return res.data

}).catch((err) => {
    console.log(err)
    return err.message
})

export const getCartUser = async (id) => await API.get('/card', id)

export const setUser = async (data) => await API.post('/login', data)

export const getUser = async (data) => await API.post('/login/sgs', data)
export const hell = async () => await API.get('/login/hell')

