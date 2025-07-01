import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  national_id: {
    type: String,
    required: true,
    unique: true,
  },
  certification: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  club: {
    type:String,
    required: true,
  },
});

export default mongoose.model("Coach", coachSchema);
