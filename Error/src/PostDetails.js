import { useEffect, useState } from "react";
import axios from "axios";

export default function PostDetails({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      });
  }, [id]);

  if (!post) {
    return (
      <>
        <h3>loading...</h3>
      </>
    );
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{post.title.toUpperCase()}</h3>
      <p>{post.body}</p>
    </div>
  );
}
