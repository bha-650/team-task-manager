import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://team-task-manager-backend-mbge.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role: "member",
        }
      );

      alert(data.message);
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h1>Create Account 🚀</h1>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;