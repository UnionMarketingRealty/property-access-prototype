import axios from 'axios';

export default axios.create({
  //will run the backend at 3500
  baseURL: 'http://localhost:3500',
});