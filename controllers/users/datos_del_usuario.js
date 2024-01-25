const user = require("../../models/user");
const {
  ver_si_me_sigo_con_ese_usuario,
} = require("../../services/ids_de_seguidores_y_seguidos");

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
    // info de seguimiento

    const informacion_de_seguidores = await ver_si_me_sigo_con_ese_usuario(
      req.user.id,
      id
    );
    console.log("informacion_de_seguidores", informacion_de_seguidores);

    res.status(200).json({
      status: "success",
      consulta: id,
      user: usuario,
      lo_sigo: informacion_de_seguidores.lo_sigo,
      me_sigue: informacion_de_seguidores.me_sigue,
    });
  }
};

module.exports = profile;
