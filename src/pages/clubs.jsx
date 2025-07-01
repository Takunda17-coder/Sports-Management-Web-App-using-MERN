import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClubId, setEditingClubId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    establishedYear: "",
    president: "",
    contact: "",
    logo: "",
    email: "",
  });

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    const filtered = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.president.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClubs(filtered);
  }, [searchTerm, clubs]);

  const fetchClubs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clubs");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setClubs(data);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
      alert("Could not load clubs. Make sure your backend server is running.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/clubs/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Club deleted successfully");
          fetchClubs();
        } else {
          alert("Failed to delete club");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong");
      }
    }
  };

  const handleAddOrEditClub = async (e) => {
    e.preventDefault();
    const url = editingClubId
      ? `http://localhost:5000/api/clubs/${editingClubId}`
      : "http://localhost:5000/api/clubs";
    const method = editingClubId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(
          editingClubId
            ? "Club updated successfully"
            : "Club added successfully"
        );
        setFormData({
          name: "",
          location: "",
          establishedYear: "",
          president: "",
          contact: "",
          logo: "",
          email: "",
        });
        setEditingClubId(null);
        setShowForm(false);
        fetchClubs();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to submit club");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (club) => {
    setFormData({
      name: club.name || "",
      location: club.location || "",
      establishedYear: club.establishedYear || "",
      president: club.president || "",
      contact: club.contact || "",
      logo: club.logo || "",
      email: club.email || "",
    });
    setEditingClubId(club._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold">Clubs</h2>
          <input
            type="text"
            placeholder="Search by name or president..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 bg-white py-2 w-full sm:w-1/2"
          />
          <button
            onClick={() => {
              setShowForm(true);
              setEditingClubId(null);
              setFormData({
                name: "",
                location: "",
                establishedYear: "",
                president: "",
                contact: "",
                logo: "",
                email: "",
              });
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Club
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Established Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  President
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClubs.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No clubs found.
                  </td>
                </tr>
              ) : (
                filteredClubs.map((club) => (
                  <tr key={club._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={club.logo}
                        alt={`${club.name} logo`}
                        className="h-10 w-10 object-contain rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{club.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {club.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {club.establishedYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {club.president}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {club.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {club.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEdit(club)}
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
            <form
              onSubmit={handleAddOrEditClub}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                {editingClubId ? "Edit Club" : "Add New Club"}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Club Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="number"
                name="establishedYear"
                placeholder="Established Year"
                value={formData.establishedYear}
                onChange={handleChange}
                required
                min="1800"
                max={new Date().getFullYear()}
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="president"
                placeholder="President"
                value={formData.president}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="url"
                name="logo"
                placeholder="Logo URL"
                value={formData.logo}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  {editingClubId ? "Update Club" : "Add Club"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Clubs;
