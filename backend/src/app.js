require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/usuarioRoutes.js");
const autenticacionRouter = require("./routes/autenticacionRoutes.js");
const archivoRouter = require("./routes/archivoRouter.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(fileUpload());

// Rutas
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(autenticacionRouter);
app.use(archivoRouter);

module.exports = app;
