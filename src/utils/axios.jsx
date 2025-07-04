import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGExYjBkZmNjZjhkZGM1MWZhMGE1NDBhYzE1ZmYzYyIsIm5iZiI6MTc1MDkzOTYwMi44MzYsInN1YiI6IjY4NWQzN2QyYzA2NmE0OTRjMTM0ZjAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-ylHtWC95iq4-9F_G7dlifdv3BAdSim7ApT1ag4AhI'
    }
})

export default instance;
