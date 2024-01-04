import { Card } from "react-bootstrap"
import { useAuth } from "../context/authContext";
function CommentInPost(comment) {
  const { user, isAuthenticated} =useAuth();

  const commentContent =  comment.comment.comment;
  const author= comment.comment.autor?.userName;

  return (
    <Card key={comment._id} className="mt-1 containerComment">
      <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">
      {isAuthenticated && author === user.username ? "Comentaste:" : `${author} comentó:`}
      </Card.Subtitle>
      <p className="commentText">
        {commentContent}
      </p>
      </Card.Body>
    </Card>
  )
}

export default CommentInPost