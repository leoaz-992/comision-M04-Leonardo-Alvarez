import { RouterProvider } from "react-router-dom"
import routes from "./Routes"
import Layout from "./layout/Layout"
import { AuthProvider } from "./context/authContext"

function App() {
  return (
    <>
      <AuthProvider>
      <Layout>
        <RouterProvider router={routes}/>
      </Layout>
      </AuthProvider>
    </>
  )
}

export default App
