import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const getCard = async () => await API.get(`/`)

export const postCard = async (data) => await API.post(`/creatItem`, data)

export const getImage = async (id) => await API.get(`/images/${id}`)

export const getCartUser = async (id) => await API.get(`/card/${id}`)

export const setUser = async (data) => await API.post('/login', data)

export const getUser = async (data) => await API.post('/login/sgs', data)

export const likesProdectd = async (id, data) => await API.patch(`${id}`, data)

export const sesrshQurey = async (sershVul) => await API.get(`/sersh?qurey=${sershVul}`)

export const getAllUSers = async () => await API.get('/adman/users')

export const upDataCard = async (id, data) =>  await API.patch(`/card/${id}`, data)

export const deletUser = async (id) => await API.delete(`/adman/deletuser/${id}`)

export const deletItem = async (id) => await API.delete(`/adman/deletitem/${id}`)

export const commentItem = async (id, data) => await API.patch(`/comment/creat/${id}`, data)

export const deleteComment = async (id, data) => await API.patch(`/comment/delete/${id}`, data)

export const updataComment = async (id, data) => await API.patch(`/comment/updata/${id}`, data)

export const SingWithGoogle = async (data) => await API.post('login/Sing_inGoogle', data)

export const loginWithGoogle = async (data) => await API.post('login/LoginGoogle', data)

export const getLovedItem = async () => await API.get("/loved")

export const postPayments  = async (data) => await API.post("/payments", data)

export const getPaments = async () => await API.get("/adman/admanPayment")

export const getPaymentyId = async (id) => await API.get(`/adman/payment/${id}`)