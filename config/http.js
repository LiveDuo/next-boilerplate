import axios from "axios";

// import env from "../config/env";

import { getSimpleState } from "simple-redux-js";

axios.defaults.headers.post["Content-Type"] = "application/json";

const axiosInstance = axios.create({
  // baseURL: env.apiRoot,
  timeout: 20000
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.authorization = getSimpleState("token");
    return config;
  }
  // error => {
  //   return Promise.reject(error)
  // }
);

export default axiosInstance;
