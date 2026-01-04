import { useEffect, useState } from "react";
import client from "./AxiosInterceptor";

export default function PostDetails({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    client.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <h3>loading...</h3>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{post.title.toUpperCase()}</h3>
      <p>{post.body}</p>
    </div>
  );
}
