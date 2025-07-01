import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    organizer: "",
    logo: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      // Sort events by date ascending
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
      alert("Could not load events. Make sure your backend server is running.");
    }
  };

  // Filter events based on searchTerm (case-insensitive)
  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();
    return (
      event.name.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search) ||
      event.organizer.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Event deleted successfully");
          fetchEvents();
        } else {
          alert("Failed to delete event");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingEventId
        ? `http://localhost:5000/api/events/${editingEventId}`
        : "http://localhost:5000/api/events";
      const method = editingEventId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(editingEventId ? "Event updated successfully" : "Event added successfully");
        setFormData({
          name: "",
          date: "",
          location: "",
          description: "",
          organizer: "",
          logo: "",
        });
        setEditingEventId(null);
        setShowForm(false);
        fetchEvents();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to submit event");
      }
    } catch (error) {
      console.error("Submit event error:", error);
      alert("Something went wrong while submitting the event");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name || "",
      date: event.date ? event.date.split("T")[0] : "", // format for input date
      location: event.location || "",
      description: event.description || "",
      organizer: event.organizer || "",
      logo: event.logo || "",
    });
    setEditingEventId(event._id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEventId(null);
    setFormData({
      name: "",
      date: "",
      location: "",
      description: "",
      organizer: "",
      logo: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Events</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name, location, or organizer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded bg-white px-3 py-2 mr-4 sm:w-1/2 w-full"
          />

          <button
            onClick={() => {
              handleCloseForm();
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Event
          </button>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
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
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            onClick={handleCloseForm}
          />
          <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                {editingEventId ? "Edit Event" : "Add New Event"}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded min-h-[100px]"
                />
                <input
                  type="text"
                  name="organizer"
                  placeholder="Organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="logo"
                  placeholder="Logo URL"
                  value={formData.logo}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  {editingEventId ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
