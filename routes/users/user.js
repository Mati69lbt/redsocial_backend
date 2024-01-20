const { Router } = require("express");
("uploadsavatars");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, "Avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

const auth = require("../../middlewares/auth");

const prueba_users = require("../../controllers/users/example");
const register_user = require("../../controllers/users/register_users");
const login = require("../../controllers/users/login_user");
const profile = require("../../controllers/users/datos_del_usuario");
const listado = require("../../controllers/users/listado_de_usuarios");
const update = require("../../controllers/users/actualizar_perfil");
const foto_de_perfil = require("../../controllers/users/foto_de_perfil");

const router = Router();

// importar

// Definir
router.get("/prueba-users", auth, prueba_users);
router.post("/register", register_user);
router.post("/login", login);
router.get("/profile/:id", auth, profile);
router.get("/list/:page?", auth, listado);
router.put("/update", auth, update);
router.get("/upload", [auth, uploads.single("file0")], foto_de_perfil);

//exportar
module.exports = router;
