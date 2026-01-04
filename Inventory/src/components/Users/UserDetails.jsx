export default function UserDetails({ user }) {
  if (!user) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}
