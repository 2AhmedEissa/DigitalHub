import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import PostErrorBoundary from "./PostErrorBoundary";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
    });
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
