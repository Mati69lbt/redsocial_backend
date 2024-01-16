const { Router } = require("express");
const prueba_Publications = require("../../controllers/publications/example");
const router = Router();

// importar


//Definir
router.get("/prueba-publications", prueba_Publications);


//exportar
module.exports = router;
