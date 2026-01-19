import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; 
  }
};
