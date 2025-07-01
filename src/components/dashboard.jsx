import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    players: 0,
    coaches: 0,
    clubs: 0,
    events: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch regular stats (players, coaches, clubs)
        const resStats = await fetch("http://localhost:5000/api/dashboard/stats");
        const dataStats = await resStats.json();

        // Fetch all events
        const resEvents = await fetch("http://localhost:5000/api/events");
        const allEvents = await resEvents.json();

        // Filter upcoming events (date today or later)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize to start of today

        const upcomingEventsCount = allEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        }).length;

        // Set combined stats with upcoming events count
        setStats({
          players: dataStats.players,
          coaches: dataStats.coaches,
          clubs: dataStats.clubs,
          events: upcomingEventsCount,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard!</p>

      <div className="flex flex-row  justify-between gap-6 mt-10 w-full ">
        <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-lg font-semibold mb-2">Registered Players</h2>
          <h3 className="text-xl font-semibold text-green-700">
            {stats.players}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-2">Registered Coaches</h2>
          <h3 className="text-lg font-semibold text-green-700">
            {stats.coaches}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-2">Active Clubs</h2>
          <h3 className="text-lg font-semibold text-green-700">
            {stats.clubs}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <h3 className="text-lg font-semibold text-green-700">
            {stats.events}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
