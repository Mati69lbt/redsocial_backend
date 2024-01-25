const user = require("../../models/user");
const { id_Usuario_para_ver_sus_follows } = require("../../services/ids_de_seguidores_y_seguidos");


const listado = async (req, res) => {
  // Controlar en que pagina estamos
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);

  // Consultar con Moongoose paginate
  try {
    let itemsPorPagina = 5;

    const options = {
      page: page,
      limit: itemsPorPagina,
    };

    const usuarios = await user.paginate({}, options);

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No hay artículos en la base de datos",
      });
    }

    // Hacer un listado de ids de los usuarios que me siguen y sigo
    let followUserIds = await id_Usuario_para_ver_sus_follows(req.user.id);

    return res.status(200).send({
      status: "success",
      menssage: "Ruta de listado de usuarios",
      page,
      itemsPorPagina,
      total_de_usuarios: usuarios.totalDocs,
      total_de_paginas: Math.ceil(usuarios.totalDocs / itemsPorPagina),
      users: usuarios.docs,
      siguiendo: followUserIds.siguiendo,
      me_siguen: followUserIds.seguidores,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener listado",
      error: error.message,
    });
  }
};

module.exports = listado;
