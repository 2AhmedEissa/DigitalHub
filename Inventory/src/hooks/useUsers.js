import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

/**
 * Custom hook for managing users data and logic.
 * Handles fetching, searching, and selection of users.
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // handleSearchChange is now passed to a component that handles its own debouncing
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
