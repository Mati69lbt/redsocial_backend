const prueba_Followers = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de followers",
  });
};

module.exports = prueba_Followers;