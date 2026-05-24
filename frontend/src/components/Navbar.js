import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav>
      <h2>Team Task Manager</h2>

      <div>
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button
              onClick={logoutHandler}
              style={{
                background: "#dc2626",
                marginLeft: "10px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;