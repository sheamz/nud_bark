import axios from "axios";
import { Cookies } from "react-cookie";

let cookie = new Cookies();

const axiosInstance = axios.create({
  baseURL: "http://localhost/nud_bark/src/backend/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookie.get("atk");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
