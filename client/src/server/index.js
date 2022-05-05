import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })


export const getCard = async () => await API.get(`/`)
export const postCard = async (data) => await API.post(`/creatItem`,  data).then((resolve)  =>  {
    return resolve.statusText 
}).catch((err) => {
    console.log(err);
    return err.message
})

export const getImage = async (id) => await API.get(`/images/${id}`)