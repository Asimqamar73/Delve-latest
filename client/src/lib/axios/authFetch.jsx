import axios from "axios";


export const authFetch = axios.create({
    baseURL: "/api/v1",
  });


 authFetch.interceptors.request.use(
    (config) => {
      // config.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      Object.assign(config.headers,{"Authorization":`Bearer ${localStorage.getItem("token")}`})
      // console.log(config)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        console.log("AUTH ERROR");
      }
      return Promise.reject(error);
    }
  );