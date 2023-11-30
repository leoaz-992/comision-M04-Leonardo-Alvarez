import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes";
import Layout from "./layout/Layout"
import { AuthProvider } from "./context/authContext"
import { PostProvider } from "./context/postContext"
import Inicio  from"./views/inicio"
import Login  from"./views/login"
import Registro from "./views/registro"
import CreatePost from "./views/createPost";

function App() {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <Layout>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
               <Route path="/login" element={<Login />} />
              <Route path="/registrarse" element={<Registro/>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/crear-post" element={<CreatePost/>} />
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
