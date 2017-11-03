
import axios from 'axios'


export function CallApi(url,type='get',data={},header={}) {

    let reqHeader = Object.assign(header,{"Accept":''});

    if(type === 'get'){
        return axios.get(url, {headers: reqHeader})
            .then((response) => {
                return Promise.resolve(response.data)
            })
            .catch((err) => {
                switch (err.response.data.status_code){

                    case 401:
                        return Promise.reject(err.response.data.data);

                    default:
                        return Promise.reject(err);
                }
            });
    }else if(type === 'post'){
        return axios.post(url,data,{headers: reqHeader})
            .then((response) => {
                return Promise.resolve(response)
            })
            .catch((err) => {
                switch (err.response.data.status_code){
                    case 401:
                        return Promise.reject(err.response.data.data);
                    case 409:
                        return Promise.reject(err.response.data.data);
                    default:
                        return Promise.reject(err);
                }
            });
    }
    else if(type === 'delete'){
        return axios.delete(url,{headers:reqHeader})
            .then((response) => {
                return Promise.resolve(response)
            })
            .catch((err) => {
                switch (err.response.data.status_code){
                    case 401:
                        return Promise.reject(err.response.data.data);
                    case 409:
                        return Promise.reject(err.response.data.data);
                    default:
                        return Promise.reject(err);
                }
            });
    }
    else if(type === 'put'){
        return axios.put(url,data,{headers:reqHeader})
            .then((response) => {
                return Promise.resolve(response)
            })
            .catch((err) => {
                switch (err.response.data.status_code){
                    case 401:
                        return Promise.reject(err.response.data.data);
                    case 409:
                        return Promise.reject(err.response.data.data);
                    default:
                        return Promise.reject(err);
                }
            });
    }
}

