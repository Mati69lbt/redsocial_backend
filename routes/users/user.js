const { Router } = require("express");
const prueba_users = require("../../controllers/users/example");
const register_user = require("../../controllers/users/register_users");
const login = require("../../controllers/users/login_user");
const auth = require("../../middlewares/auth");

const router = Router();

// importar

// Definir
router.get("/prueba-users", auth, prueba_users);
router.post("/register", register_user);
router.post("/login", login);

//exportar
module.exports = router;
