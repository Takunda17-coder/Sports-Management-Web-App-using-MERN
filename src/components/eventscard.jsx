import React, { useEffect, useState } from "react";

const Eventscard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      // Filter for upcoming events (today or later)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingEvents = data
        .filter((event) => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3); // Limit to 3 events

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
      alert("Could not load events. Make sure your backend server is running.");
    }
  };

  return (
    <div className="flex flex-row items-start w-auto h-auto bg-white rounded-lg shadow-md my-4 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-600">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Organizer:</strong> {event.organizer}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Description:</strong> {event.description}
                  </p>
                  {event.logo && (
                    <img
                      src={event.logo}
                      alt={`${event.name} logo`}
                      className="mt-4 max-h-20 object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventscard;
