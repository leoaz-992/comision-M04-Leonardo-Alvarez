import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';


const Inicio = () => {

  const[postList, setPostList]=useState([])

  const getAllPost =async()=>{
    const urlPost="http://localhost:3000/";
    const respuesta = await axios.get(urlPost);
    setPostList(respuesta.data);
  }
  useEffect(()=>{
    getAllPost()
  },[])
 
  return (
      <>
      <h1 className='text-center'>todas las publicaciones</h1>
      <div className='row g-3 my-2 '>
      {postList.map((post)=>(
        <div key={post._id} className='col-md-3 mx-3'>
        <Card className='' >
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{post.createdAt.substring(0,10)}</Card.Subtitle>
          <Card.Text>
            {post.description}
          </Card.Text>
          <Card.Link href={`/post/${post._id}`}>ver post</Card.Link>
        </Card.Body>
      </Card>
      </div>
      ))}
    </div>
    </>
  )
}

export default Inicio;