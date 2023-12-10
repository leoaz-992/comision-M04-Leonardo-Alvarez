import PostForm from "../components/PostForm";

function CreatePost() {

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
      <h1 className="text-center">crea tu publicacion</h1>
          <PostForm />
      </div>
    </div>
  )
}

export default CreatePost;