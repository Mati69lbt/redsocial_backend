const Follow = require("../models/follow");

const id_Usuario_para_ver_sus_follows = async (identificacion_userId) => {
  try {
    // Sacar info de seguimiento
    let siguiendo = await Follow.find({ user: identificacion_userId }).select({
      followed: 1,
      _id: 0,
    });

    let seguidores = await Follow.find({
      followed: identificacion_userId,
    }).select({
      user: 1,
      _id: 0,
    });

    // Procesar array de identificadores
    let limpiar_siguiendo = [];

    siguiendo.forEach((seguidor) => {
      limpiar_siguiendo.push(seguidor.followed);
    });

    let limpiar_seguidores = [];

    seguidores.forEach((seguidor) => {
      limpiar_seguidores.push(seguidor.user);
    });

    return { siguiendo: limpiar_siguiendo, seguidores: limpiar_seguidores };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const ver_si_me_sigo_con_ese_usuario = async (
  identificacion_userId,
  profileUserID
) => {
  try {
    let lo_sigo = await Follow.findOne({
      user: identificacion_userId,
      followed: profileUserID,
    });

    let me_sigue = await Follow.findOne({
      user: profileUserID,
      followed: identificacion_userId,
    });

    return { lo_sigo, me_sigue: me_sigue || {} };
  } catch (error) {
    console.log(error);
    return {};
  }
};

module.exports = {
  id_Usuario_para_ver_sus_follows,
  ver_si_me_sigo_con_ese_usuario,
};
