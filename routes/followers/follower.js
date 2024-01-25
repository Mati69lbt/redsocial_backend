const { Router } = require("express");
const auth = require("../../middlewares/auth");

const prueba_Followers = require("../../controllers/followers/example");
const seguir_a_usuarios = require("../../controllers/followers/seguir_a_usuarios");
const unfollowers = require("../../controllers/followers/dejar_de_seguir_ a_usuarios");
const {
  siguiendo,
  seguidores,
} = require("../../controllers/followers/siguiendo_y_seguidores");

const router = Router();

// importar

//Definir
router.get("/prueba-followers", prueba_Followers);
router.post("/save", auth, seguir_a_usuarios);
router.delete("/unfollow/:id", auth, unfollowers);
router.get("/following/:id?/:page?", auth, siguiendo);
router.get("/followers/:id?/:page?", auth, seguidores);

//exportar
module.exports = router;
