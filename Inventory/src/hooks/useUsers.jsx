import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  clearAllUsers,
} from "../services/userService";
import toast from "react-hot-toast";

export const useUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/users", fetchUsers, {
    revalidateIfStale: false,
  });

  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  useState(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleSaveUser = useCallback(
    async (userData) => {
      try {
        if (editingUser) {
          const updatedUser = { ...editingUser, ...userData };

          await mutate(
            async () => {
              await updateUser(updatedUser);
              const currentUsers = users || [];
              return currentUsers.map((u) =>
                u.id === editingUser.id ? updatedUser : u,
              );
            },
            {
              optimisticData: (currentUsers) =>
                currentUsers
                  ? currentUsers.map((u) =>
                      u.id === editingUser.id ? updatedUser : u,
                    )
                  : [],
              rollbackOnError: true,
              revalidate: true,
            },
          );

          toast.success("User updated successfully", {
            icon: "✏️",
            style: {
              borderRadius: "10px",
              background: "#10b981",
              color: "#fff",
            },
          });
        } else {
          await mutate(
            async () => {
              const newUser = await createUser(userData);
              const currentUsers = users || [];
              return [...currentUsers, newUser];
            },
            {
              optimisticData: (currentUsers) => [
                ...(currentUsers || []),
                { ...userData, id: Date.now() },
              ], // Temporary ID for optimistic
              rollbackOnError: true,
              revalidate: true,
            },
          );

          toast.success("User added successfully", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#10b981",
              color: "#fff",
            },
          });
        }
        setIsModalOpen(false);
        setEditingUser(null);
      } catch (error) {
        toast.error("Failed to save user", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#ef4444",
            color: "#fff",
          },
        });
        console.error("Error saving user:", error);
      }
    },
    [editingUser, users, mutate],
  );

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        await mutate(
          async () => {
            await deleteUser(userId);
            const currentUsers = users || [];
            return currentUsers.filter((u) => u.id !== userId);
          },
          {
            optimisticData: (currentUsers) =>
              currentUsers ? currentUsers.filter((u) => u.id !== userId) : [],
            rollbackOnError: true,
            revalidate: true,
          },
        );

        setSelectedUser(null);

        toast.success("User deleted successfully", {
          icon: "🗑️",
          style: {
            borderRadius: "10px",
            background: "#ef4444",
            color: "#fff",
          },
        });
      } catch (error) {
        toast.error("Failed to delete user", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#ef4444",
            color: "#fff",
          },
        });
        console.error("Error deleting user:", error);
      }
    },
    [users, mutate],
  );

  const handleClearAll = useCallback(async () => {
    try {
      await mutate(
        async () => {
          await clearAllUsers();
          return [];
        },
        {
          optimisticData: [],
          rollbackOnError: true,
          revalidate: true,
        },
      );

      setSelectedUser(null);
      setEditingUser(null);

      toast.success("All users cleared successfully", {
        icon: "🧹",
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to clear users", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
      console.error("Error clearing users:", error);
    }
  }, [mutate]);

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    currentPage,
    totalPages,
    setCurrentPage,
    search,
    loading: isLoading,
    error: error ? "Failed to fetch users. Please try again later" : null,
    selectedUser,
    isModalOpen,
    editingUser,
    handleSearchChange,
    handleSelectUser,
    handleClearSelection,
    handleAddClick,
    handleEditClick,
    handleCloseModal,
    handleSaveUser,
    handleDeleteUser,
    handleClearAll,
  };
};
