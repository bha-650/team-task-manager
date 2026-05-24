import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://team-task-manager-backend-mbge.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h1>Welcome Back 👋</h1>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;