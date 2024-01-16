const { Router } = require("express");
const prueba_Followers = require("../../controllers/followers/example");
const router = Router();

// importar


//Definir
router.get("/prueba-followers", prueba_Followers);


//exportar
module.exports = router;