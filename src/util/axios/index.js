import axios from "axios";

const BASE_URL = 'https://jonathan-todo-api.herokuapp.com/';
const instance = () => {
    let options = { baseURL: BASE_URL };
    const token = localStorage.getItem('token');
    if (token) {
        options['headers'] = { 'x-auth-token': token };
    }

    return axios.create(options);
}

export default () => instance()