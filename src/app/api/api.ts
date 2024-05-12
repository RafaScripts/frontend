import axios from 'axios';

const api = axios.create({
    baseURL: 'https://macbook-pro-de-lais.tail5dcec.ts.net/api/v1'
});

export default api;