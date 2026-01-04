import { useUsers } from "../hooks/useUsers";
import UserSearch from "../components/Users/UserSearch";
import UserList from "../components/Users/UserList";
import UserDetails from "../components/Users/UserDetails";

export default function UsersPage() {
  const {
    users,
    search,
    setSearch,
    loading,
    selectedUser,
    setSelectedUser,
  } = useUsers();

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <UserSearch value={search} onChange={setSearch} />

      {loading && <p>Loading...</p>}

      <UserList users={users} onUserClick={setSelectedUser} />

      <UserDetails user={selectedUser} />
    </div>
  );
}
