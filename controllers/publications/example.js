const prueba_Publications = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de publications",
  });
};

module.exports = prueba_Publications;