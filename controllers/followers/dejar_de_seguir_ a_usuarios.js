const Follow = require("../../models/follow");

const unfollowers = async (req, res) => {
  // Recoger el id del usuario identificado
  let userId = req.user.id;

  // Recoger el id del usuario que sigo y quiero dejar de seguir
  let followedId = req.params.id;

  try {
    const result = await Follow.deleteOne({
      user: userId,
      followed: followedId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        status: "error",
        message: "No se encontró el follow para eliminar",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Follow eliminado correctamente",
      result: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = unfollowers;
