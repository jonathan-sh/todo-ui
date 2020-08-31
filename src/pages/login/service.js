import http from '../../util/axios';

const doLogin = (email, password) => {
     return http().post('/user/login', { email, password })
          .then(it => {
               const token = it.data.token;
               const name = it.data.name;
               localStorage.setItem('token', token);
               localStorage.setItem('name', name);
               return token;
          })
          .catch(it => { throw it })


}

export default { doLogin }