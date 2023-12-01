import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes";
import Layout from "./layout/Layout"
import { AuthProvider } from "./context/authContext"
import Inicio  from"./views/inicio"
import Login  from"./views/login"
import Registro from "./views/registro"
import CreatePost from "./views/createPost";
import ViewOnePost from "./views/viewOnePost";

function App() {
  return (
    <>
      <AuthProvider>
          <Layout>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
               <Route path="/login" element={<Login />} />
              <Route path="/registrarse" element={<Registro/>} />
              <Route path="/post/:id" element={<ViewOnePost/>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/crear-post" element={<CreatePost/>} />
                <Route path="/edit-post/:id" element={<CreatePost/>} />
              </Route>
            </Routes>
            </BrowserRouter>
          </Layout>
      </AuthProvider>
    </>
  )
}

export default App
