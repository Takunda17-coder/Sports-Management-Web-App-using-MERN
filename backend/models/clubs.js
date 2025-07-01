import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  president: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Club", clubSchema);
