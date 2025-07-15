import React, { useState, useEffect } from "react";

const Playercard = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.phone.includes(searchTerm) ||
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

  const handleToggle = () => {
    if (visibleCount >= filteredPlayers.length) {
      setVisibleCount(5);
    } else {
      setVisibleCount(filteredPlayers.length);
    }
  };

  const visiblePlayers = filteredPlayers.slice(0, visibleCount);

  return (
    <div className="flex w-full justify-center self-start h-auto bg-white rounded-lg shadow-md border border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Registered Players</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visiblePlayers.map((player) => (
                <tr key={player._id} className="border-b last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.sex}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.ranking}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.club}</td>
                </tr>
              ))}
              {filteredPlayers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No players found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredPlayers.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={handleToggle}
                className="text-blue-600 hover:underline"
              >
                {visibleCount >= filteredPlayers.length ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playercard;
