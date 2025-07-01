import express from "express";
import Player from "../models/players.js";
import Coach from "../models/coaches.js";
import Club from "../models/clubs.js";
import Event from "../models/events.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const playerCount = await Player.countDocuments();
    const coachCount = await Coach.countDocuments();
    const clubCount = await Club.countDocuments();
    const eventCount = await Event.countDocuments();

    res.json({
      players: playerCount,
      coaches: coachCount,
      clubs: clubCount,
      events: eventCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});

export default router;
