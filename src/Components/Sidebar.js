import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";


function Sidebar() {
    const [isHovered, setIsHovered] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/login");
    };
    return (
        <div className="Sidebar">
            <img src="/Studysync.svg" alt="logo" width="90%" />
            <ul className="sidebarItems">
                <li className="nav-item"
                onMouseEnter={() => setIsHovered("Dashboard")}
                onMouseLeave={() => setIsHovered(null)}>
                    <NavLink to="/Dashboard" className="nav-link">
                        {({ isActive }) => (
                            <>
                                <img className="nav-icon" src={isHovered === 'Dashboard' || isActive ? "/icons/dashboard-active.svg" : "/icons/dashboard.svg"} alt="Dashboard" />
                                <span className={isActive ? "active-text" : "" }>Dashboard</span>
                            </>
                        )}
                    </NavLink>
                </li>
                <li className="nav-item"
                onMouseEnter={() => setIsHovered("Task Management")}
                onMouseLeave={() => setIsHovered(null)}>
                    <NavLink to="/TaskManagement" className="nav-link">
                        {({ isActive }) => (
                            <>
                                <img className="nav-icon" src={isHovered=== "Task Management"|| isActive ? "/icons/task-active.svg" : "/icons/task.svg"} alt="Tasks" />
                                <span className={isActive ? "active-text" : ""}>Task Management</span>
                            </>
                        )}
                    </NavLink>
                </li>
                <li className="nav-item"
                onMouseEnter={() => setIsHovered("Profile")}
                onMouseLeave={() => setIsHovered(null)}>
                    <NavLink to="/Profile" className="nav-link">
                        {({ isActive }) => (
                            <>
                                <img className="nav-icon" src={isHovered==="Profile" || isActive ? "/icons/profile-active.svg" : "/icons/profile.svg"} alt="Profile" />
                                <span className={isActive ? "active-text" : ""}>Profile</span>
                            </>
                        )}
                    </NavLink>
                </li>
                <li
                    className="nav-item logout-item"
                    onMouseEnter={() => setIsHovered("Logout")}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={handleLogout} 
                >
                    <div className="nav-link">
                        <img
                            className="nav-icon"
                            src={isHovered==="Logout" ? "/icons/logout-hover.svg" : "/icons/logout.svg"}
                            alt="Logout"
                        />
                        <span className="logout-text">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
