const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const FollowSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  followed: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Adjuntar el plugin de paginación al esquema
FollowSchema.plugin(mongoosePaginate);
module.exports = model("Follow", FollowSchema, "follows");
// -------------------nombre , esquema, nombre que le queda
