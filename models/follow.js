const { Schema, model } = require("mongoose");

const FollowSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  followed: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Follow", FollowSchema, "follows");
// -------------------nombre , esquema, nombre que le queda
