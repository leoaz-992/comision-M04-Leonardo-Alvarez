import PostForm from "../components/PostForm";
import{createPostRequest}from "../api/post"

function CreatePost() {

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
      <h1 className="text-center">crea tu publicacion</h1>
          <PostForm funct={createPostRequest} />
      </div>
    </div>
  )
}

export default CreatePost;