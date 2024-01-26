const Follow = require("../../models/follow");
const {
  id_Usuario_para_ver_sus_follows,
} = require("../../services/ids_de_seguidores_y_seguidos");

const siguiendo = async (req, res) => {
  // En este listado veras los usuarios que vos estas siguiendo

  // Sacar el id del usuario identificado
  let userId = req.user.id;

  // Comprobar si me llega el id por parametro en url, porque tiene mas prioridad
  if (req.params.id) userId = req.params.id;

  // Comprobar si me llega la pagina, si no es la pagina 1
  let page = 1;
  try {
    if (req.params.page) page = req.params.page;
    page = parseInt(page);

    // Usuario por pagina que quiero mostrar
    const itemsPorPagina = 5;
    const options = {
      page: page,
      limit: itemsPorPagina,
      sort: "name",
    };
    // Buscar a follow, popular datos de los usuarios y paginar con mongoose paginate
    const busqueda = await Follow.paginate({ user: userId }, options);

    await Follow.populate(busqueda.docs, {
      path: "user followed",
      options: {
        select: "-password -role -__v",
      },
    });

    // Ver los seguidores de otros usuarios y tambien me siguen a mi
    // Hacer un listado de ids de los usuarios que me siguen y sigo

    let followUserIds = await id_Usuario_para_ver_sus_follows(userId);

    return res.status(200).send({
      status: "success",
      message: "Aqui veras el listado de usuarios q vos seguis!",
      page,
      itemsPorPagina,
      Total_de_seguidores: busqueda.totalDocs,
      totalPages: busqueda.totalPages,
      siguiendo: followUserIds.siguiendo,
      me_siguen: followUserIds.seguidores,
      resultados: busqueda,
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: error.message,
    });
  }
};
const seguidores = async (req, res) => {
  // En este listado veras los usuarios que te estan siguiendo, tus seguidores

  // Sacar el id del usuario identificado
  let userId = req.user.id;

  // Comprobar si me llega el id por parametro en url, porque tiene mas prioridad
  if (req.params.id) userId = req.params.id;

  // Comprobar si me llega la pagina, si no es la pagina 1
  let page = 1;
  try {
    if (req.params.page) page = req.params.page;
    page = parseInt(page);

    // Usuario por pagina que quiero mostrar
    const itemsPorPagina = 5;
    const options = {
      page: page,
      limit: itemsPorPagina,
    };
    // Buscar a follow, popular datos de los usuarios y paginar con mongoose paginate
    const busqueda = await Follow.paginate({ followed: userId }, options);

    await Follow.populate(busqueda.docs, {
      path: "user followed",
      options: {
        sort: { name: 1 },
        select: "-password -role -__v",
      },
    });

    let followUserIds = await id_Usuario_para_ver_sus_follows(userId);

    return res.status(200).send({
      status: "success",
      message: "Aqui veras el listado de usuarios que me siguen!",
      page,
      itemsPorPagina,
      Total_de_seguidores: busqueda.totalDocs,
      totalPages: busqueda.totalPages,
      siguiendo: followUserIds.siguiendo,
      me_siguen: followUserIds.seguidores,
      resultados: busqueda,
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = {
  siguiendo,
  seguidores,
};
