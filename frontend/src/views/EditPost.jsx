import { useParams} from "react-router-dom";
import EditPostForm from "../components/EditPostForm"

function EditPost() {
  const params = useParams();
  const postId= params.id;

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
      <h1 className="text-center">Editar publicación</h1>
        <EditPostForm idPost={postId} />  
      </div>
    </div>
  )
}

export default EditPost