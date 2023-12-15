import { Card } from "react-bootstrap"
import { useAuth } from "../context/authContext";
function ommentInPost(comment) {
  const { user, isAuthenticated} =useAuth();

  const commentContent =  comment.comment.comment;
  const author= comment.comment.autor?.userName;

  return (
    <Card key={comment._id} className="mt-1">
      <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">
      {isAuthenticated && author === user.username ? "Comentaste:" : `${author} comentó:`}
        </Card.Subtitle>
        {commentContent}
      </Card.Body>
    </Card>
  )
}

export default ommentInPost