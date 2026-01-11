import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API;

export const fetchUsers = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};
