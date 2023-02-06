import { useMemo, useState } from "react";
import styles from "@/styles/PostItem.module.css";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";
import Button from "./Button";
import EditPostForm from "./EditPostForm";
import CommentsList from "./CommentsList";

const PostItem = ({ post, userCPF, username, fetchData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/post/${post.id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const image = useMemo(() => {
    if (post?.conteudo) {
      const buffer = Buffer.from(post?.conteudo?.data);
      const base64Image = buffer.toString("base64");
      return `data:image/jpeg;base64,${base64Image}`;
    } else {
      return undefined;
    }
  }, [post]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ProfilePicture
          user={post}
          size={50}
          className={styles.profilePicture}
        />
        <p className={styles.username}>{post.nome_completo}</p>
      </div>
      <p className={styles.caption}>{post?.legenda}</p>
      {image && (
        <Image
          src={image}
          alt="postagem"
          className={styles.postImage}
          width={500}
          height={500}
        />
      )}
      {userCPF === post.cpf && (
        <div className={styles.buttonsContainer}>
          <Button
            text="Editar"
            color="#ffc107"
            onClick={() => setIsEditing(true)}
          />
          <Button text="Apagar" color="#ff5151" onClick={handleDelete} />
        </div>
      )}

      {isEditing && (
        <EditPostForm
          post={post}
          fetchData={fetchData}
          setIsEditing={setIsEditing}
        />
      )}
      <div className={styles.commentsContainer}>
        <Button
          text={showComments ? "Esconder Comentários" : "Mostrar Comentários"}
          color="#3b5998"
          onClick={() => setShowComments((showComments) => !showComments)}
        />
        {showComments && (
          <div className={styles.commentsContainer}>
            <h1>Comentários</h1>
            <CommentsList
              postId={post.id}
              userCPF={userCPF}
              username={username}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
