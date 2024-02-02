const Publication = require("../../models/publication");

const publicaciones_de_un_usuario = async (req, res) => {
  // Sacar id del usuario en url
  const userId = req.params.id;

  try {
    let page = 1;
    if (req.params.page) {
      page = req.params.page;
    }
    page = parseInt(page);

    let itemsPorPagina = 5;

    const options = {
      page: page,
      limit: itemsPorPagina,
      sort: { created_at: -1 },
    };

    const publicaciones = await Publication.paginate({ user: userId }, options);

    if (!publicaciones.docs || publicaciones.docs.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No hay publicaciones en la base de datos",
      });
    }
    await Publication.populate(publicaciones.docs, {
      path: "user",
      options: {
        select: "-password -__v -role",
        sort: "created_at: -1",
      },
    });

    return res.status(200).json({
      status: "success",
      mensaje: "Aqui estan las publicaciones del Usuario",
      user: req.user,
      page: publicaciones.page,
      totalPages: publicaciones.totalPages,
      TotalDocs: publicaciones.totalDocs,
      publicaciones,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error en el listado de publicaciones del usuario",
      error: error.message,
    });
  }
};

module.exports = publicaciones_de_un_usuario;
