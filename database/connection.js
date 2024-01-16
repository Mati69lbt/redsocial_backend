const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("Conexion exitosa a la Base de Datos: mi_redsocial");
  } catch (error) {
    console.log(`Este es el error: ${error}`);
    throw new Error("Lamentablemente no se pudo conectar a la Base de Datos");
  }
};

//exporta connection
module.exports = connection;
