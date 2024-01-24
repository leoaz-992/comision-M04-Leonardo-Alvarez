import axios from "axios";

const API_URL = "https://viaja-app.onrender.com/";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default instance;
