export default function UserSearch({ value, onChange }) {
  return (
    <input
      placeholder="Search users"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
