import axios from "axios";

const apiUrl = "http://localhost:3000/users";

export const fetchUsers = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createUser = async (user) => {
  const userWithId = {
    ...user,
    id: user.id ? String(user.id) : String(Date.now()),
  };
  const response = await axios.post(apiUrl, userWithId);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${apiUrl}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${apiUrl}/${userId}`);
  return userId;
};

export const clearAllUsers = async () => {
  const response = await axios.get(apiUrl);
  const users = response.data;
  await Promise.all(users.map((u) => axios.delete(`${apiUrl}/${u.id}`)));
  return [];
};
