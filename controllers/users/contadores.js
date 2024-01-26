const Follow = require("../../models/follow");
const Publication = require("../../models/publication");
const contadores = async (req, res) => {
  let userId = req.user.id;
  if (req.params.id) {
    userId = req.params.id;
  }
  try {
    const seguiendo = await Follow.countDocuments({ user: userId });
    const seguidores = await Follow.countDocuments({ followed: userId });
    const publicaciones = await Publication.countDocuments({ user: userId });

    return res.status(200).send({
      a: req.user,
      b: req.params,
      seguiendo: seguiendo,
      seguidores: seguidores,
      publicaciones: publicaciones,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Hubo un error en el conteo",
      msj: error.message,
    });
  }
};

module.exports = contadores;