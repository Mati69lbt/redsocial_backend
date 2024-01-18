const user = require("../../models/user");

const profile = async (req, res) => {
  // Aca tomaremos los datos del usuario
  // Recibir el paramtro del id del usuario por url
  let id = req.params.id;

  let usuario;
  // Consulta para sacar los datos del usuario
  try {
    usuario = await user.findById(id).select({ password: 0, role: 0 });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Usuario no encontrado",
      error: error.message,
    });
  }
  if (!usuario) {
    return res.status(404).json({
      status: "error",
      message: "El usuario no existe",
    });
  } else {
    // posteriormente devolver los followers
    res.status(200).json({
      status: "success",
      consulta: id,
      user: usuario,
    });
  }
};

module.exports = profile;
