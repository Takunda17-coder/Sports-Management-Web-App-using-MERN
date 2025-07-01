import express from "express";
import Club from "../models/clubs.js";

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const clubs = await Club.find();
        res.json(clubs);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const newClub = new Club(req.body);
        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deletedClub = await Club.findByIdAndDelete(req.params.id);
        if (!deletedClub) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json(updatedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



export default router;