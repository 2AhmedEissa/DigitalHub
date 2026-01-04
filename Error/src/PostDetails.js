import { useEffect, useState } from "react";

export default function PostDetails({ id }) {
  const [post, setPost] = useState(null);

  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
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
      <h3>{post?.title?.toUpperCase()}</h3>
      <p>{post?.body}</p>
    </div>
  );
}
