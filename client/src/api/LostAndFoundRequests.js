import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getAllLostAndFound = () => API.get(`/lostAndFounds/getAll`);
export const updateLostAndFound = (lfId, data) => API.put(`/lostAndFounds/${lfId}/update`, data);
export const deleteLostAndFound = (lfId, data) => API.delete(`/lostAndFounds/${lfId}/delete`, data);


