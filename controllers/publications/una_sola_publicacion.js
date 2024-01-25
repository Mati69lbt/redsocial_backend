const Publication = require("../../models/publication");

const sacar_una_sola_publicacion = async (req, res) => {
  // Sacar id de la publicacion de la url
  let publicationId = req.params.id;

  // Buscar la publicacion
  try {
    let publicacion;
    publicacion = await Publication.findById(publicationId);

    if (!publicacion) {
      return res.status(404).json({
        status: "error",
        message: "La Publicacion no existe",
      });
    } else {
      return res.status(200).json({
        status: "success",
        mensaje: "Publicacion Unica a Mostrar",
        publicacion,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error la Publicacion Unica",
      error: error.message,
    });
  }

  return res.status(200).json({
    status: "success",
    mensaje: "Publicacion Unica a Mostrar",
  });
};

module.exports = sacar_una_sola_publicacion;
