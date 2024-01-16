// Importar dependencias
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");
const puerto = process.env.PORT;

//Mensaje de Bienvenida
console.log("Api de node para Red Social iniciada ");

//conexion a la base de datos
connection();

// Crear servidor node
const app = express();

// Configurar cors
app.use(cors());

// convertir los datos del body a objetos js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

// cargar configuracion de rutas

//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    id: 1,
    name: "Matias Daniel Delgado",
    web: "https://matiasdelgado.onrender.com/",
  });
});

// RUTAS
const routes_users = require("./routes/users/user");
const routes_publications = require("./routes/publications/publication")
const routes_followers = require("./routes/followers/follower")

//cargo las rutas
app.use("/api", routes_users);
app.use("/api", routes_publications)
app.use("/api", routes_followers)

// porner al servidor a escuchar peticiones http
app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});
