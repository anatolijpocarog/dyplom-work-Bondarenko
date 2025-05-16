import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6826560b397e48c91315c48d.mockapi.io',
});

export const totalCars = async () => {
  const { data } = await instance.get('/homes');
  return data.length;
};

export const requestCatatlogCars = async page => {
  const { data } = await instance.get(`/homes?page=${page}&limit=12`);

  return data;
};
