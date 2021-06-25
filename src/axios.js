import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-fs--clone.cloudfunctions.net/api'
});

export default instance;