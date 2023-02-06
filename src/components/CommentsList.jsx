import Comment from "./Comment";
import CommentForm from "./CommentForm";

const { useEffect, useState } = require("react");

const CommentsList = ({ postId, userCPF, username }) => {
  const [commentsList, setCommentsList] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:3000/api/comment/${postId}`);
    const data = await res.json();
    setCommentsList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {commentsList.length > 0 &&
        commentsList.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            userCPF={userCPF}
            fetchData={fetchData}
          />
        ))}
      <CommentForm
        postId={postId}
        userCPF={userCPF}
        username={username}
        fetchData={fetchData}
      />
    </div>
  );
};

export default CommentsList;
