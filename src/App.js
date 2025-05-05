import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from './Pages/Dashboard';
import TaskManagement from './Pages/TaskManagement';
import Profile from './Pages/Profile';
import CreateTask from './Pages/CreateTask';
import EditTask from './Pages/EditTask';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function AppLayout() {
  const isAuthenticated = localStorage.getItem("user");
  const location = useLocation();

  const showLayout = isAuthenticated && !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      {showLayout && <Sidebar />}

      <div className={showLayout ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {isAuthenticated && (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/TaskManagement" element={<TaskManagement />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path="/edit-task" element={<EditTask />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
