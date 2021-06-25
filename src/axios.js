import axios from 'axios';

const instance = axios.create({
  baseURL: "https://us-central1-fs--clone.cloudfunctions.net/api"
  // 'http://localhost:5001/fs--clone/us-central1/api'
});

export default instance;