// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import playerRoutes from "./routes/players.js";
import coachRoutes from "./routes/coaches.js";
import dashboardRoutes from "./routes/dashboard.js";
import eventRoutes from "./routes/events.js";
import clubRoutes from "./routes/clubs.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON in request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/clubs", clubRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Optional root route for health check
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process on DB failure
  });

// Optional export for testing or integration
export default app;
