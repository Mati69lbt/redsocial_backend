const User = require("../../models/user");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  // Recoger informacion del usuario
  const userIdentificado = req.user;

  const userToUpdate = req.body;

  // Eliminar campos sobrantes
  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;
  delete userToUpdate.image;

  const email = userToUpdate.email
    ? userToUpdate.email.toLowerCase()
    : undefined;
  const nick = userToUpdate.nick ? userToUpdate.nick.toLowerCase() : undefined;

  try {
    // Comprobar si el usuario ya existe
    const existingUsers = await User.find({
      $or: [{ email: email }, { nick: nick }],
    });

    let userVerificado = false;

    existingUsers.forEach((user) => {
      if (user && user._id != userIdentificado.id) {
        userVerificado = true;
      }
      if (userVerificado) {
        return res.status(409).send({
          status: "error",
          message:
            "El correo electrónico o nombre de usuario ya está registrado",
        });
      }
    });

    // cifrar contraseña
    if (userToUpdate.password) {
      const hashedPassword = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = hashedPassword;
    } else {
      delete userToUpdate.password;
    }

    // Buscar y actualizar
    try {
      const usuario_actualizacion = await User.findOneAndUpdate(
        { _id: userIdentificado.id },
        userToUpdate,
        { new: true }
      );

      if (!usuario_actualizacion || !userToUpdate) {
        return res.status(400).json({
          status: "error",
          message: "Error al actualizar el usuario",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Metodo para actualizar el perfil",
        mensaje: "Perfil Actualizado",
        user: usuario_actualizacion,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar el usuario",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

module.exports = update;
