const prueba_users = (req, res) => {
  try {
    console.log("prueba_users");
    return res.status(200).json({
      mensaje: "Soy una acción de prueba en mi controlador de Users",
    });
  } catch (error) {
    console.log(`Este error es: ${error}`);
  }
};

module.exports = prueba_users;
