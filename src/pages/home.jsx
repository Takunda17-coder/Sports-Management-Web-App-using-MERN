import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../components/dashboard";
import Navbar from "../components/navbar";
import Playercard from "../components/playercard";
import Coachescard from "../components/coachescard";
import Eventscard from "../components/eventscard";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow px-4 py-8 w-full max-w-7xl mx-auto">
        <Dashboard />
        <div className="container mx-auto mb-8 flex flex-col items-center">
          <Eventscard />
          <Playercard />
          <Coachescard />
        </div>
      </main>
    </div>
  );
};

export default Home;
