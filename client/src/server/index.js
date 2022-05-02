import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })


export const getCard = async () => await API.get(`/`)
export const postCard = async (data) => await API.post(`/creatItem`,  data).then( async (req, res)  =>  {
    await console.log(req.statusText)
}).catch((err) => console.log(err))