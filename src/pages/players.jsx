import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    national_id: "",
    ranking: "",
    club: "",
    image: "",
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.phone.includes(searchTerm) ||
        player.national_id.includes(searchTerm) ||
        player.club.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
  }, [searchTerm, players]);

  const fetchPlayers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/players");
      const data = await res.json();
      setPlayers(data);
      setFilteredPlayers(data);
    } catch (error) {
      console.error("Failed to fetch players", error);
    }
  };

  const handleAddOrUpdatePlayer = async (e) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `http://localhost:5000/api/players/${editingPlayerId}`
        : "http://localhost:5000/api/players";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          ranking: Number(formData.ranking),
        }),
      });

      if (res.ok) {
        alert(`Player ${isEditing ? "updated" : "added"} successfully`);
        resetForm();
        fetchPlayers();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save player");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/players/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Player deleted successfully");
          fetchPlayers();
        } else {
          alert("Failed to delete player");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong");
      }
    }
  };

  const handleEdit = (player) => {
    setFormData(player);
    setEditingPlayerId(player._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      address: "",
      national_id: "",
      ranking: "",
      club: "",
      image: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingPlayerId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-auto min-h-screen bg-gray-100">
      <Navbar />

      <div className="container  mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold mb-6">Players</span>
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded bg-white px-3 py-2 sm:w-1/2 w-full"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Player
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow ">
          <table className="table-auto bg-white rounded shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  National ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ranking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player._id} className="border-b last:border-0">
                  <td className="py-2 px-4">
                    {player.image ? (
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.national_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.ranking}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.club}</td>

                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(player)}
                      className="text-blue-600  hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(player._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPlayers.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No players found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <>
          <div
            onClick={resetForm}
            className="fixed inset-0 z-40 backdrop-blur-sm"
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <form
              onSubmit={handleAddOrUpdatePlayer}
              className="bg-white p-6 rounded shadow-lg max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="col-span-full text-2xl font-bold mb-4 text-center">
                {isEditing ? "Edit Player" : "Add New Player"}
              </h2>

              {Object.entries(formData).map(([key, value]) => (
                <input
                  key={key}
                  type={
                    key === "email"
                      ? "email"
                      : key === "age" || key === "ranking"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={value}
                  onChange={handleChange}
                  className={`border px-3 py-2 rounded ${
                    key === "image" ? "col-span-full" : ""
                  }`}
                  required={key !== "image"}
                />
              ))}

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
                  {isEditing ? "Update Player" : "Add Player"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Players;
