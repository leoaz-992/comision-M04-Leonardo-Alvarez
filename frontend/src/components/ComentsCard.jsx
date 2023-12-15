import {Accordion, Badge } from "react-bootstrap"
import CommentInPost from "./commentInPost";

function ComentsCard({content}) {
  const comments= content;

  return (
    <>
    <Accordion className='mt-2'>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='d-flex justify-content-between '>
          Comentarios
          <Badge className='mx-2' bg="info" pill>
            {comments.length}
          </Badge>
        </Accordion.Header>
        <Accordion.Body>
            {comments && comments.length === 0?("no existen comentarios."):(
              comments.map((comment)=>(
                <CommentInPost key={comment._id} comment={comment}/>
              ))
            )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export default ComentsCard