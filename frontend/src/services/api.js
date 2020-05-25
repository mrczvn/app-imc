import axios from 'axios';

const ApiRoutes = {
  baseUrl: 'http://localhost:8000',
  signup: 'signup',
  signin: 'signin',
  classification: 'classification',
};

export default (data) => {
  return axios.get(`${ApiRoutes.baseUrl}/${ApiRoutes.signin}`, {
    auth: {
      username: data.email,
      password: data.password,
    },
  });
};
