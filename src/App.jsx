import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";

// Pages
import Home from "./Pages/Home";
import List from "./Pages/List";
import Create from "./Pages/Create";
import Update from "./Pages/Update";
import Delete from "./Pages/Delete";
import Profile from "./Pages/Profile";

// Components
import RegistrationForm from "./Pages/Components/RegistrationForm";
import LoginForm from "./Pages/Components/LoginForm";
import ProtectedRoute from "./Pages/Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/list" element={<List />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete"
          element={
            <ProtectedRoute>
              <Delete />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
