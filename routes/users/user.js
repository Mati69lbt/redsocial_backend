const { Router } = require("express");
const prueba_users = require("../../controllers/users/example");
const register_user = require("../../controllers/users/register_users");
const login = require("../../controllers/users/login_user");
const auth = require("../../middlewares/auth");
const profile = require("../../controllers/users/datos_del_usuario");

const router = Router();

// importar

// Definir
router.get("/prueba-users", auth, prueba_users);
router.post("/register", register_user);
router.post("/login", login);
router.get("/profile/:id", auth, profile);

//exportar
module.exports = router;
