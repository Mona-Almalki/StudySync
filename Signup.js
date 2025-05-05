import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/php_server/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert("Account created successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/Dashboard");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f7f9;
        }

        .container {
          display: flex;
          height: 100vh;
          
        }

        .left-panel {
          background-color: #fff;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
          width: 50vw;
        }

        .left-panel img {
          width: 300px;
          margin-bottom: 20px;
        }

        .left-panel h2 {
          color: #5a73fc;
          font-size: 40px;
          margin-bottom: 30px;
        }

        .left-panel button {
          background-color: #5a73fc;
          color: #fff;
          padding: 12px 32px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .left-panel button:hover {
          background-color: #3d55d9;
        }

        .right-panel {
          flex: 2;
          background-color: #f0f2f5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50vw;
      
        }

        .right-panel h2 {
          font-size: 26px;
          color: #5a73fc;
          margin-bottom: 30px;
          font-size: 50px;
        }

        form {
          display: flex;
          flex-direction: column;
          width: 500px;
          justify-content: center;
          align-items: center;
        }

        form input {
          margin-bottom: 20px;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          width: 500px;

        }

        form button {
          background-color: #5a73fc;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          width: 200px;
        }

        form button:hover {
          background-color: #3d55d9;
        }

        
      `}</style>

      <div className="container">
        <div className="left-panel">
          <img src="/Studysync.svg" alt="StudySync Logo" />
          <h2>Welcome Back!</h2>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
        <div className="right-panel">
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          
        </div>
      </div>
    </>
  );
}

export default Signup;
