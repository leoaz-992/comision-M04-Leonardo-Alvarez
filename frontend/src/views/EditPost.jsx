import { Link, useParams} from "react-router-dom";
import EditPostForm from "../components/EditPostForm"
import { useEffect } from "react";
import { usePost } from "../context/postContext";
import { useAuth } from "../context/authContext";

function NotAuthorMessage() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        <h2 className="text-center textTitle">No puedes editar este Post ya que no eres el autor</h2>
        <Link className='mx-1 btn btn-info btn-sm' to={`/perfil`}>Volver a perfil</Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function EditPostContent({ postId }) {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        <h1 className="text-center">Editar publicación</h1>
        <EditPostForm idPost={postId} />  
      </div>
    </div>
  );
}

function EditPost() {
  const params = useParams();
  const { user } = useAuth();
  const { post, getOnePost } = usePost();
  const postId = params.id;

  useEffect(() => {
    const fetchPost = async () => {
      await getOnePost(postId);
    };
    fetchPost();
  }, []);

  if (post && post?.autorName?._id !== user?.id) {
    return <NotAuthorMessage />;
  } else {
    return <EditPostContent postId={postId} />;
  }
}

export default EditPost;
