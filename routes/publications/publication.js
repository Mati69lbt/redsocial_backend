const { Router } = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/publications/");
  },
  filename: (req, file, cb) => {
    cb(null, "pub-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

const auth = require("../../middlewares/auth");

const prueba_Publications = require("../../controllers/publications/example");
const guardar_publicacion = require("../../controllers/publications/guardar_publicacion");
const sacar_una_sola_publicacion = require("../../controllers/publications/una_sola_publicacion");
const eliminar_publicacion = require("../../controllers/publications/elimanar_publicacion");
const publicaciones_de_un_usuario = require("../../controllers/publications/publicaciones_de_un_usuario");
const subir_imagen_a_bd = require("../../controllers/publications/subir_imagen_a_bd");
const conseguir_imagen_de_la_bd = require("../../controllers/publications/conseguir_imagen_de_la_bd");

const router = Router();
 
// importar

//Definir
router.get("/prueba-publications", prueba_Publications);
router.post("/save", auth, guardar_publicacion);
router.get("/publicacion-a-mostar/:id", auth, sacar_una_sola_publicacion);
router.delete("/eliminar-publicacion/:id", auth, eliminar_publicacion);
router.get("/publicaciones-de-un-usuario/:id/:page?", auth, publicaciones_de_un_usuario);
router.post("/upload/:id", [auth, uploads.single("file0")], subir_imagen_a_bd);
router.get("/imagen/:file", auth, conseguir_imagen_de_la_bd);

//exportar
module.exports = router;
