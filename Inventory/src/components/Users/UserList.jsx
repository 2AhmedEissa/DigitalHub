export default function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => onUserClick(user)}
          style={{ cursor: "pointer" }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}
