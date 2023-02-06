import React, { useState } from "react";
import styles from "@/styles/Comment.module.css";
import EditCommentForm from "./EditCommentForm";

const Comment = ({ comment, userCPF, fetchData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/comment/${comment.id}`, {
      method: "DELETE",
    });
    fetchData();
  };
  return (
    <>
      {isEditing && (
        <EditCommentForm
          comment={comment}
          fetchData={fetchData}
          setIsEditing={setIsEditing}
        />
      )}
      {!isEditing && (
        <div className={styles.commentContainer}>
          <div className={styles.header}>
            <div className={styles.userName}>{comment.nome_completo}</div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.text}>{comment.texto}</p>
          </div>
          {userCPF === comment.cpf && (
            <div className={styles.footer}>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Apagar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
