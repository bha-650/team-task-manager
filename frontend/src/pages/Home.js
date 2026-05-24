function Home() {
    return (
      <div className="container">
        <div className="card hero">
          <h1>Team Task Manager 🚀</h1>
  
          <p>
            A modern MERN application to manage team tasks,
            track progress, and stay productive.
          </p>
  
          <br />
  
          <button onClick={() => (window.location.href = "/register")}>
            Get Started
          </button>
        </div>
  
        <div className="card">
          <h2>Features</h2>
          <p>✅ Secure user authentication</p>
          <p>✅ JWT protected dashboard</p>
          <p>✅ Create, complete, and delete tasks</p>
          <p>✅ MongoDB database integration</p>
          <p>✅ Clean React frontend</p>
        </div>
      </div>
    );
  }
  
  export default Home;