const { Router } = require("express");
const prueba_users = require("../../controllers/users/example");

const router = Router();

// importar

// Definir
router.get("/prueba-users", prueba_users);

//exportar
module.exports = router;
