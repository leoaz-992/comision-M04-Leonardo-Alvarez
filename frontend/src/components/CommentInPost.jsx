import { Card } from "react-bootstrap"

function ommentInPost(comment) {
  const commentContent =  comment.comment.comment;
  const author= comment.comment.autor?.userName;

  return (
    <Card key={comment._id} className="mt-1">
      <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">{author} comentó:</Card.Subtitle>
        {commentContent}
      </Card.Body>
    </Card>
  )
}

export default ommentInPost