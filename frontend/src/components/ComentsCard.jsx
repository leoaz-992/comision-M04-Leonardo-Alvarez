import {Accordion, Badge } from "react-bootstrap"
import CommentInPost from "./CommentInPost";

// eslint-disable-next-line react/prop-types
function ComentsCard({content}) {
  const comments= content;

  return (
    <>
    <Accordion className='mt-2'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="d-flex justify-content-between">
            <h5 className="mb-0 pe-2">Comentarios</h5> 
            <Badge className='mx-2' bg="info" pill>
            {comments.length}
            </Badge>
          </div>
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