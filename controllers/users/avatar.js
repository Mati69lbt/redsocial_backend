const fs = require("fs");
const path = require("path");

const avatar = async (req, res) => {
  // Consigue de la Base de Datos la Foto de Perfil

  // Sacar el parametro de la url
  const file = req.params.file;

  // Montar el path real de la imagen
  const filePath = "./uploads/avatars/" + file;

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

module.exports = avatar;
