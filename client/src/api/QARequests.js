import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getAllCategories = () => API.get('/discussion/category/getAll')
export const getAllQuestions = () => API.get('/discussion/question/getAll')
export const createQuestion = (newQuestion) => API.post('/discussion/question/create',newQuestion)
export const getAllAnswers = () => API.get('/discussion/answer/getAll')
export const createAnswer = (questionId, newAnswer) => API.post(`/discussion/answer/${questionId}/create`, newAnswer);
export const voteAnswer = (ansId, data) => API.put(`/discussion/answer/${ansId}/vote`,data)

