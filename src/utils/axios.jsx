import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
        Authorization: process.env.Api_key
    }
})

export default instance;