require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const conectarMongo = require("./config/MongooseConfig.js");

const usuarioRouter = require("./routes/usuarioRoutes.js");
const autenticacionRouter = require("./routes/autenticacionRoutes.js");
const archivoRouter = require("./routes/archivoRouter.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(fileUpload());

// Rutas
app.use(usuarioRouter);
app.use(autenticacionRouter);
app.use(archivoRouter);

app.listen(PORT, () => {
  //database();
  conectarMongo();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
