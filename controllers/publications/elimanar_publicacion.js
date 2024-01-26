const Publication = require("../../models/publication");

const eliminar_publicacion = async (req, res) => {
  // Sacar id de la publicacion de la url
  let publicationId = req.params.id;
  let user_activo = req.user.id;
  try {
    let publicacion;
    publicacion = await Publication.findOneAndDelete({
      user: user_activo,
      _id: publicationId,
    });

    if (!publicacion) {
      return res.status(404).json({
        status: "error",
        message: "La publicacion no existe",
      });
    } else {
      return res.status(200).json({
        status: "success",
        mensaje: "Publicacion Eliminada con Exito",
        publicacion,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al Eliminar la Publicacion",
      error: error.message,
    });
  }
};

module.exports = eliminar_publicacion;
