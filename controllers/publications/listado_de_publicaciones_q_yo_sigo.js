const Publication = require("../../models/publication");

const {
  id_Usuario_para_ver_sus_follows,
} = require("../../services/ids_de_seguidores_y_seguidos");

const listado_de_publicaciones_q_yo_sigo = async (req, res) => {
  try {
    // Sacar la pagina actual
    let page = 1;
    if (req.params.page) {
      page = req.params.page;
    }
    page = parseInt(page);

    // Establecer la cantidad de publicaciones por pagina
    let itemsPorPagina = 5;

    // Sacar un array de identificadores que yo sigo como usuario identificado
    const los_q_yo_estoy_siguiendo = await id_Usuario_para_ver_sus_follows(
      req.user.id
    );
    // Find a publicaciones con el metodo in, ordenar, popular y paginar
    const options = {
      page: page,
      limit: itemsPorPagina,
      sort: "created_at: -1",
    };
    // Buscar a follow, popular datos de los usuarios y paginar con mongoose paginate
    const busqueda = await Publication.paginate(
      { user: los_q_yo_estoy_siguiendo.siguiendo },
      options
    );

    await Publication.populate(busqueda.docs, {
      path: "user",
      options: {
        select: "-password -role -__v -email",
        sort: "created_at: -1",
      },
    });

    return res.status(200).send({
      status: "success",
      menssage: "Aca estan las publicaciones de los usuarios que vos seguis",
      page: busqueda.page,
      totalPages: busqueda.totalPages,
      TotalDocs: busqueda.totalDocs,
      a: req.user,
      los_q_yo_estoy_siguiendo: los_q_yo_estoy_siguiendo.siguiendo,
      busqueda,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error en el listado de publicaciones del usuario",
      error: error.message,
    });
  }
};

module.exports = listado_de_publicaciones_q_yo_sigo;
