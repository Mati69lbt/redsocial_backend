const User = require("../../models/user");
const fs = require("fs");

const foto_de_perfil = async (req, res) => {
  // Recoger el fichero de imagen y comprobar que existe
  if (!req.file) {
    return res.status(404).send({
      status: "Error",
      message: "No has subido ninguna imagen",
    });
  }
  // Conseguir el nombre del archivo
  let nombre_Imagen = req.file.originalname;

  // Sacar la extension del archivo
  let imagen_split = nombre_Imagen.split(".");
  let extension_archivo = imagen_split[1].toLowerCase();

  // Comprobar extension
  const extensiones_permitidas = ["png", "jpg", "jepg", "gif"].map((ext) =>
    ext.toLowerCase()
  );
  // Si no es correcta, borrar el archivo
  if (!extensiones_permitidas.includes(extension_archivo)) {
    fs.unlinkSync(req.file.path);
    return res.status(500).send({
      status: "Error",
      message: `La extensión de la imagen no es válida`,
    });
  } else {
    try {
      // Si es correcta, guardar la imagen en la Base de Datos
      const imagen_Actualizada = await User.findOneAndUpdate(
        { _id: req.user.id },
        { image: req.file.filename },
        { new: true }
      );
      if (!imagen_Actualizada) {
        return res.status(404).json({
          status: "Error",
          message: "Hubo problemas para subir la imagen",
        });
      } else {
        // Delvolver Respuesta
        res.status(200).json({
          status: "success",
          message: "Metodo para subir Avatar al Perfil",
          file: req.file,
          user: imagen_Actualizada,
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: "Error",
        message: "Hubo problemas para subir la imagen",
        message: error.message,
      });
    }
  }
};

module.exports = foto_de_perfil;
