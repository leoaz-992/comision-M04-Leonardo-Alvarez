const app = require("./src/app.js");
const conectarMongo = require("./src/config/MongooseConfig.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //database();
  conectarMongo();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
