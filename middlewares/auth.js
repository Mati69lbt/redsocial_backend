// importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

// Importar clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secret;

// Middleware de autenticacion
const auth = (req, res, next) => {
  console.log("Se esta usando el Middleware de Auth");
  // Comprobar si me llega la cabecera de autenticacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "No hay cabecera de autenticación",
    });
  }
  // Limpiar el Token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  // Decodificar el Token
  try {
    let payload = jwt.decode(token, secret);

    // Comprobar expiracion del Token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "El token ha expirado.",
      });
    }
    // Agregar datods de usuarios a request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Token Invalido",
      message: error,
    });
  }

  // Pasar a ejecucion de accion
  next();
};

module.exports = auth;
