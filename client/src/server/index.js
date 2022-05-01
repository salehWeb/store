import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })


export const getCard = () => API.get(`/`)
export const postCard = (data) => API.post(`/creatItem`, { data })