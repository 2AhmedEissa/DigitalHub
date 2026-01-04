import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import PostErrorBoundary from "./PostErrorBoundary";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts List</h2>
      {posts.map((p) => (
        <p
          key={p.id}
          onClick={() => setSelectedId(p.id)}
          style={{ cursor: "pointer" }}
        >
          {p.title}
        </p>
      ))}

      <hr />

      {selectedId && (
        <PostErrorBoundary>
          <PostDetails
            id={selectedId}
            fallback={<p>Failed to load post details!</p>}
          />
        </PostErrorBoundary>
      )}
    </div>
  );
}

export default App;
