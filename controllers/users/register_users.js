const User = require("../../models/user");
// importar bcrypt
const bcrypt = require("bcrypt");

const register_user = async (req, res) => {
  //recoger datos de la peticion
  let params = req.body;

  // comprobar que lleguen bien, validar
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(404).json({
      status: "error",
      message: "Su registro no ha sido satisfactorio, faltan datos",
    });
  }

  try {
    // controlar usuarios duplicados
    const existingUsers = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (existingUsers && existingUsers.length >= 1) {
      return res.status(409).send({
        status: "success",
        message: "El correo electrónico o nombre de usuario ya está registrado",
      });
    }

    // cifrar contraseña
    const hashedPassword = await bcrypt.hash(params.password, 10);
    params.password = hashedPassword;

    // crear objeto de usuario
    let user_to_save = new User(params);

    // guardar usuarios en la base de datos y
    // devolver el resultado
    try {
      const user_save = await user_to_save.save();
      return res.status(200).json({
        status: "success",
        message: "Usuario registrado exitosamente",
        user_save,
      });
    } catch (error) {
      console.log("Error al salvar el usuario ", error);

      return res.status(500).json({
        status: "error",
        message: "Error al guardar el usuario",
        message: error,
      });
    }
  } catch (error) {
    console.error("Error general:", error);
    return res.status(500).json({
      status: "error",
      message:
        "Error en la consulta de registros, ya existe el mail o nickname",
      message: error,
    });
  }
};

module.exports = register_user;
