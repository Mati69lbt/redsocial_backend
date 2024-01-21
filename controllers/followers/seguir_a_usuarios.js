const Follow = require("../../models/follow");

const seguir_a_usuarios = async (req, res) => {
  // Conseguir datos por body
  const params = req.body;

  // Sacar id del usuario identificado
  const usuario_identificado = req.user;

  // Crear objeto con modelo follow
  let userToFollow = new Follow({
    user: usuario_identificado.id,
    followed: params.followed,
  });

  try {
    // Guardar objeto en Base de Datos
    const follow_guardado = await userToFollow.save();
    return res.status(200).send({
      status: "success",
      message: "Ahora sigues a este usuario!!!",
      identificacion: usuario_identificado,
      follow: follow_guardado,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al seguir al usuario",
      error: error.message,
    });
  }
};

module.exports = seguir_a_usuarios;
