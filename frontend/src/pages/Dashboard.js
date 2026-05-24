import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const API = "https://team-task-manager-backend-mbge.onrender.com";

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getTasks();
  };

  const completeTask = async (id) => {
    await axios.put(
      `${API}/api/tasks/${id}`,
      { status: "completed" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getTasks();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🚀 Dashboard</h1>

      {/* Create Task */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-grid">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <span
                className={
                  task.status === "completed"
                    ? "status completed"
                    : "status pending"
                }
              >
                {task.status}
              </span>

              <div className="task-actions">
                <button onClick={() => completeTask(task._id)}>
                  Complete
                </button>
                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;