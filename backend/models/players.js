import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  national_id: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ranking: { type: Number, required: true },
  club: { type: String, required: true },
  image: { type: String, default: "" },
});

export default mongoose.model("Player", playerSchema);
