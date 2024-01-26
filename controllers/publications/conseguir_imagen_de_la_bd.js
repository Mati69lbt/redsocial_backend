const fs = require("fs");
const path = require("path");

const conseguir_imagen_de_la_bd = async (req, res) => {
  // Consigue de la Base de Datos la Foto de la Publicacion

  // Sacar el parametro de la url
  const file = req.params.file;

  // Montar el path real de la imagen
  const filePath = "./uploads/publications/" + file;

  // Comprobar que el archivo existe
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "Error",
        message: "La foto no existe",
      });
    }
    // Si existe delvolver un FIle
    return res.sendFile(path.resolve(filePath));
  });
};

module.exports = conseguir_imagen_de_la_bd;
