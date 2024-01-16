const { Router } = require("express");
const prueba_users = require("../../controllers/users/example");
const register_user = require("../../controllers/users/register_users");

const router = Router();

// importar

// Definir
router.get("/prueba-users", prueba_users);
router.post("/register", register_user);

//exportar
module.exports = router;
