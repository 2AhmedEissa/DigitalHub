import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchUsers } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return {
    users: filteredUsers,
    search,
    loading,
    error,
    selectedUser,
    handleSearchChange,
    handleSelectUser,
    handleClearSelection,
  };
};
