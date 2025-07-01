import express from "express";
import Coach from "../models/coaches.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("💡 GET /api/coaches hit"); // Debug log
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCoach = new Coach(req.body);
    const saved = await newCoach.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Coach.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.json(updatedCoach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
