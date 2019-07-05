import axios from 'axios'
import router from './router'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if ( token != null ) {
      config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
  
instance.interceptors.response.use( response => {
    return response;
}, error => {
    if(error.response)
      if (error.response.status === 404) {
        router.replace('/notfound');
      }
      else if (error.response.status === 403) {
        router.replace('/forbidden');
      }
      else if (error.response.status === 500) {
        router.replace('/servererror');
      }
    if(error.response && error.response.data)
      return Promise.reject(error.response.data);
    else
      return Promise.reject(error);
});

export default instance;