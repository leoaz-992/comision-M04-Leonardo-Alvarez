import { createBrowserRouter } from "react-router-dom";

import Inicio from "./views/inicio";
import Login from "./views/login";
import Registro from "./views/registro";

const routes= createBrowserRouter([
  {
    path: "/",
    element: <Inicio/>,
}, {
    path: "/registrarse",
    element:<Registro/>,
}, {
    path: "/crear",
    element: {},
}, {
    path: "/eliminar/:id",
    element: {},
}, {
    path: "/editar/:id",
    element: {},
}, {
    path: "/ver/:id",
    element: {},
}, {
    path: "/login",
    element: <Login/>
}
])

export default routes;