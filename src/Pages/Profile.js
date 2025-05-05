import React, { useState } from 'react';

function Profile() {
  const navigate = useState();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    id: user.id,
    username: user.username || "",
    email: user.email || "",
    notification: user.notification || "2 days before"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost/php_server/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user)); 
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      alert("Error connecting to server.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize:"40px", marginTop:"200px" }}>Account information</h2>

          <label style={{ color: "#888", marginBottom: "10px", display: "block", textAlign:"left", marginTop:"90px", fontSize:"30px" }}>Name</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", fontSize:"20px" }}
          />

          <label style={{ color: "#888", marginBottom: "10px", display: "block", textAlign:"left", marginTop:"30px", fontSize:"30px", fontSize:"30px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", fontSize:"20px" }}
          />

          <label style={{ color: "#888", marginBottom: "10px", display: "block", textAlign:"left", marginTop:"30px", fontSize:"30px" }}>Notification</label>
          <select
            name="notification"
            value={form.notification}
            onChange={handleChange}
            style={{ width: "104%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", fontSize:"20px" }}
          >
            <option value="1 day before">1 day before</option>
            <option value="2 days before">2 days before</option>
            <option value="3 days before">3 days before</option>
          </select>

        <button
          onClick={handleSave} 
          style={{ width: "50%", marginTop:"100px", padding: "12px 25px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        >
          Save Changes
        </button>
      </div>
  );
}

export default Profile;
