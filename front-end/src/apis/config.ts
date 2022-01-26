import axios from 'axios'


const http = axios.create({
  timeout: 60000,
});

http.interceptors.request.use(
    config => {
        return config
    },
    error => Promise.reject(error)
);

http.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error)
);


export default http;
