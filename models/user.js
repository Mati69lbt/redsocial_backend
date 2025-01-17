const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  surname: String,
  nick: {
    type: String,
    require: true,
    unique: true,
  },
  bio: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "role_user",
  },
  image: {
    type: String,
    default: "default.png",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Adjuntar el plugin de paginación al esquema
UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "users");
// -------------------nombre , esquema, nombre que le queda
