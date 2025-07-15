import React, { useState, useEffect } from "react";

const Coachescard = () => {
  const [coaches, setCoaches] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

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

  const handleToggle = () => {
    if (visibleCount >= coaches.length) {
      setVisibleCount(5);
    } else {
      setVisibleCount(coaches.length);
    }
  };

  const visibleCoaches = coaches.slice(0, visibleCount);

  return (
    <div className="flex w-full h-auto bg-white rounded-lg shadow-md p-2 mx-4 my-4">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Registered Coaches</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sex
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience (years)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visibleCoaches.map((coach) => (
                <tr
                  key={coach._id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{coach.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.sex}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{coach.club}</td>
                </tr>
              ))}
              {coaches.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No coaches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {coaches.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={handleToggle}
                className="text-blue-600 hover:underline"
              >
                {visibleCount >= coaches.length ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coachescard;
