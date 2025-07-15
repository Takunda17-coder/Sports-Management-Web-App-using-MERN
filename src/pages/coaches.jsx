import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCoachId, setEditingCoachId] = useState(null);
  const [selectedSex, setSelectedSex] = useState("male"); // default show male coaches

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    sex: "",
    address: "",
    certification: "",
    experience: "",
    club: "",
    national_id: "",
    image: "",
  });

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coaches");
      const data = await res.json();
      setCoaches(data);
    } catch (error) {
      console.error("Failed to fetch coaches", error);
    }
  };

  // Filter coaches by selected sex and search term
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.sex.toLowerCase() === selectedSex &&
      (coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.phone.includes(searchTerm) ||
        coach.club.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handlers for add/update, delete, edit, reset, change remain unchanged (keep your existing code here)...

  const handleAddOrUpdateCoach = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `http://localhost:5000/api/coaches/${editingCoachId}`
        : "http://localhost:5000/api/coaches";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(`Coach ${isEditing ? "updated" : "added"} successfully`);
        resetForm();
        fetchCoaches();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save coach");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/coaches/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Coach deleted successfully");
          fetchCoaches();
        } else {
          alert("Failed to delete coach");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong");
      }
    }
  };

  const handleEdit = (coach) => {
    setFormData({
      name: coach.name || "",
      email: coach.email || "",
      phone: coach.phone || "",
      age: coach.age || "",
      sex: coach.sex || "",
      address: coach.address || "",
      certification: coach.certification || "",
      experience: coach.experience || "",
      club: coach.club || "",
      national_id: coach.national_id || "",
      image: coach.image || "",
    });
    setEditingCoachId(coach._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      sex: "",
      address: "",
      certification: "",
      experience: "",
      club: "",
      national_id: "",
      image: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingCoachId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderTable = (list) => (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">National ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {list.map((coach) => (
            <tr key={coach._id}>
              <td className="py-2 px-4">
                {coach.image ? (
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="h-10 w-10 object-contain rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.sex}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.certification}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.experience}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.club}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coach.national_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(coach)}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coach._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {list.length === 0 && <p className="text-center py-4">No coaches found.</p>}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4 space-x-4 flex-wrap">
          <h1 className="text-2xl font-bold flex-grow">Coaches</h1>

          <input
            type="text"
            placeholder="Search coaches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded bg-white px-3 py-2 sm:w-1/2 w-full max-w-md"
          />

          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition whitespace-nowrap"
          >
            Add Coach
          </button>
        </div>

        <div className="mb-4 flex space-x-4">
          <button
            className={`px-4 py-2 rounded font-semibold ${
              selectedSex === "male"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedSex("male")}
          >
            Male Coaches
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              selectedSex === "female"
                ? "bg-pink-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedSex("female")}
          >
            Female Coaches
          </button>
        </div>

        {renderTable(filteredCoaches)}
      </div>

      {showForm && (
        <>
          <div
            onClick={resetForm}
            className="fixed inset-0 z-40 backdrop-blur-sm"
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <form
              onSubmit={handleAddOrUpdateCoach}
              className="bg-white p-6 rounded shadow-lg max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="col-span-full text-2xl font-bold mb-4 text-center">
                {isEditing ? "Edit Coach" : "Add New Coach"}
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                className="border px-3 py-2 rounded"
              />
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="certification"
                placeholder="Certification"
                value={formData.certification}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="experience"
                placeholder="Experience (years)"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="club"
                placeholder="Club"
                value={formData.club}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="national_id"
                placeholder="National ID"
                value={formData.national_id}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />

              <div className="col-span-full flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  {isEditing ? "Update Coach" : "Add Coach"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Coaches;
