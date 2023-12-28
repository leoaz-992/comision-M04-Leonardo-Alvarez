require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/usuarioRoutes.js");
const autenticacionRouter = require("./routes/autenticacionRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.set("etag", false);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

// Rutas
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(autenticacionRouter);

module.exports = app;
