const { Router } = require("express");

const auth = require("../../middlewares/auth");

const prueba_Publications = require("../../controllers/publications/example");
const guardar_publicacion = require("../../controllers/publications/guardar_publicacion");
const sacar_una_sola_publicacion = require("../../controllers/publications/una_sola_publicacion");

const router = Router();

// importar

//Definir
router.get("/prueba-publications", prueba_Publications);
router.post("/save", auth, guardar_publicacion);
router.get("/publicacion-a-mostar/:id", auth, sacar_una_sola_publicacion);

//exportar
module.exports = router;
