import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Players from "./pages/players";
import Coaches from "./pages/coaches";
import Events from "./pages/events";
import Clubs from "./pages/clubs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("loggedIn") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/players"
          element={isAuthenticated ? <Players /> : <Navigate to="/" replace />}
        />
        <Route
          path="/coaches"
          element={isAuthenticated ? <Coaches /> : <Navigate to="/" replace />}
        />
        <Route
          path="/events"
          element={isAuthenticated ? <Events /> : <Navigate to="/" replace />}
        />
        <Route
          path="/clubs"
          element={isAuthenticated ? <Clubs /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
