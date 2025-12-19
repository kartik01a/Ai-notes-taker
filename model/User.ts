import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
})

export default models.User || model("User", UserSchema)
