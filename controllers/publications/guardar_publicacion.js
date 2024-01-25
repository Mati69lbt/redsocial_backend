const Publication = require("../../models/publication");

const guardar_publicacion = async (req, res) => {
  // Recoger datos del Body
  const params = req.body;
  console.log("params:", params);
  // Si no llega un texto, devolver una respuesta de error
  if (!params.text) {
    return res.status(400).json({
      status: "error",
      mensaje: "No hay texto en la publicacion",
    });
  }

  try {
    const nueva_Publicacion = new Publication(params);
    nueva_Publicacion.user = req.user.id;

    // Guardar Publicacion
    const publicacion_Guardada = await nueva_Publicacion.save();

    return res.status(200).json({
      status: "success",
      mensaje: "Publicacion guardada con exito",
      publicacion: publicacion_Guardada,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al guardar la Publicacion",
      error: error.message,
    });
  }
};

module.exports = guardar_publicacion;
