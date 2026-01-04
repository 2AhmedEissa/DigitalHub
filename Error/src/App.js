import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import PostErrorBoundary from "./PostErrorBoundary";
import client from "./AxiosInterceptor";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    client.get("/posts").then((res) => {
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
          <PostDetails id={selectedId} />
        </PostErrorBoundary>
      )}
    </div>
  );
}

export default App;
