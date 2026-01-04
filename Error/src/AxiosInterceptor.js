import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

/* REQ */
client.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* RES */
client.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    throw error;
  }
);

export default client;
