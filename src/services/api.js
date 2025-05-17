import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6827111b397e48c9131872f4.mockapi.io',
});

export const totalCars = async () => {
  const { data } = await instance.get('/homes');
  return data.length;
};

export const requestCatatlogCars = async page => {
  const { data } = await instance.get(`/homes?page=${page}&limit=12`);

  return data;
};

// ----------- auth-service -------------------

const instanceAuth = axios.create({
  baseURL: 'https://connections-api.goit.global',

});

export const setToken = token => {
  instanceAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestSignup = async body => {
  const { data } = await instanceAuth.post('/users/signup', body);
  setToken(data.token);
  return data;
};

export const requestLogin = async body => {
  const { data } = await instanceAuth.post('/users/login', body);
  setToken(data.token);
  return data;
};

export const requestLogout = async () => {
  const { data } = await instanceAuth.post('/users/logout');
  return data;
};
export const requestRefreshUser = async () => {
  const { data } = await instanceAuth.get('/users/current');
  return data;
};