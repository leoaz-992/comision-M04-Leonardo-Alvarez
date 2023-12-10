import { Card,Accordion, Badge } from "react-bootstrap"
function ComentsCard({postId}) {
  return (
    <>
    <Accordion className='mt-2'>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='d-flex justify-content-between '>Comentarios

      <Badge className='mx-2' bg="info" pill>
          2
        </Badge>
        </Accordion.Header>
        <Accordion.Body>
        <Card className="mt-1">
      <Card.Body>This is some text within a card body 1.</Card.Body>
    </Card>
    <Card className="mt-1">
      <Card.Body>This is some text within a card body 2.</Card.Body>
    </Card>
    <Card>
      <Card.Body>This is some text within a card body 3.</Card.Body>
    </Card>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export default ComentsCard