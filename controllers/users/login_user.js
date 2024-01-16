const user = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../../services/jwt");

const login = async (req, res) => {
  //recoger parametros del body
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos",
    });
  }

  // Buscar en la base de datos si existe
  try {
    const user_find = await user.findOne({ email: params.email });
    // .select({ password: 0 });
    // le quitamos la contraseña para que no se vea
    if (!user_find) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no registrado",
      });
    }

    // Comprobar su contraseña
    const pwd = bcrypt.compareSync(params.password, user_find.password);
    if (!pwd) {
      return res.status(400).send({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }
    // Conseguir Token
    const token = jwt.createToken(user_find);

    // Devolver Datos del Usuario
    return res.status(200).send({
      status: "success",
      message: "Usuario logueado correctamente",
      user: {
        id: user_find._id,
        name: user_find.name,
        nick: user_find.nick,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `Error al iniciar sesión ${error}`,
    });
  }
};

module.exports = login;
