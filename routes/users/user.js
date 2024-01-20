const { Router } = require("express");

const auth = require("../../middlewares/auth");

const prueba_users = require("../../controllers/users/example");
const register_user = require("../../controllers/users/register_users");
const login = require("../../controllers/users/login_user");
const profile = require("../../controllers/users/datos_del_usuario");
const listado = require("../../controllers/users/listado_de_usuarios");
const update = require("../../controllers/users/actualizar_perfil");

const router = Router();

// importar

// Definir
router.get("/prueba-users", auth, prueba_users);
router.post("/register", register_user);
router.post("/login", login);
router.get("/profile/:id", auth, profile);
router.get("/list/:page?", auth, listado);
router.put("/update", auth, update);

//exportar
module.exports = router;
