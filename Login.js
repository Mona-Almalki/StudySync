import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/php_server/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Welcome ${data.user.username}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/Dashboard";
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed. Server error.");
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

        .right-panel {
          background-color: #fff;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
          width: 50vw;
          align-items: center;
        }

        .right-panel img {
          width: 300px;
          margin-bottom: 50px;
        }

        .right-panel h1 {
          color: #5a73fc;
          font-size: 24px;
          margin-bottom: 30px;
          margin-top: 0;
          font-size: 40px;

        }

        .right-panel button {
          margin-top: 50px;
          background-color: #5a73fc;
          color: #fff;
          width: 200px;
          padding: 12px 32px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .right-panel button:hover {
          background-color: #3d55d9;
        }

        .left-panel {
          flex: 2;
          background-color: #f0f2f5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50vw;
        }

        .left-panel h2{
          font-size: 26px;
          color: #5a73fc;       
           font-size: 50px;


        }

        .right-panel p {
        color: rgb(131, 131, 133);
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

        a {
          color: #5a73fc;
          text-decoration: none;
        }
      `}</style>

      <div className="container">
        <div className="left-panel">
            <h2 style={{ textAlign: 'center', color: '#5a73fc' }}>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}
              />
              <button type="submit" style={{ padding: '12px', backgroundColor: '#5a73fc', color: 'white', borderRadius: '25px', fontSize: '16px', cursor: 'pointer' }}>
                Login
              </button>
            </form>
        </div>

        <div className="right-panel">
          <img src="/Studysync.svg" alt="StudySync Logo"/>
          <h1>Hello, </h1>
          <p>enter your details and start journey with us</p>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default Login;
