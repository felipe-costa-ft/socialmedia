import React, { useEffect, useState } from "react";
import styles from "@/styles/PostsList.module.css";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const PostsList = ({ user }) => {
  const [postsList, setPostsList] = useState(undefined);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/post");
    const data = await res.json();
    setPostsList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <PostForm user={user} fetchData={fetchData} />
      {postsList &&
        postsList?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            userCPF={user.cpf}
            username={user.nome_usuario}
            fetchData={fetchData}
          />
        ))}
    </div>
  );
};

export default PostsList;
