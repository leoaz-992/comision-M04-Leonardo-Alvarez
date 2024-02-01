import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./Routes";
import Layout from "./layout/Layout"
import { AuthProvider } from "./context/authContext"
import { PostProvider } from "./context/postContext";
import Inicio  from"./views/inicio"
import Login  from"./views/login"
import Registro from "./views/registro"
import CreatePost from "./views/createPost";
import ViewOnePost from "./views/viewOnePost";
import PerfilUser from "./views/PerfilUser";
import EditPost from "./views/EditPost";

function App() {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <Layout>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/registrarse" element={<Registro/>} />
              <Route path="/post/:id" element={<ViewOnePost/>} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/crear-post" element={<CreatePost/>} />
                <Route path="/editar-post/:id" element={<EditPost/>} />
                <Route path="/perfil" element={<PerfilUser/>} />
              </Route>
            </Routes>
            </BrowserRouter>
          </Layout>
        </PostProvider>
      </AuthProvider>
    </>
  )
}

export default App
