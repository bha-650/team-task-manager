import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const getTasks = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Error fetching tasks");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          status: "pending",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      getTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting task");
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      getTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating task");
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const updateTask = async (id) => {
    if (!editTitle || !editDescription) {
      alert("Please fill all edit fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title: editTitle,
          description: editDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      cancelEdit();
      getTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating task");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Total Tasks</h3>
          <h1>{totalTasks}</h1>
        </div>

        <div className="card stat-card">
          <h3>Completed</h3>
          <h1>{completedTasks}</h1>
        </div>

        <div className="card stat-card">
          <h3>Pending</h3>
          <h1>{pendingTasks}</h1>
        </div>
      </div>

      <div className="card">
        <h2>Create Task</h2>

        <form onSubmit={createTask}>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">Add Task</button>
        </form>
      </div>

      <h2>Your Tasks</h2>

      {loading && <p>Loading tasks...</p>}

      {!loading && tasks.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
          <h3>📭 No Tasks Yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="card task-card">
            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <br />
                <br />

                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <br />
                <br />

                <button onClick={() => updateTask(task._id)}>
                  Save
                </button>

                <button
                  onClick={cancelEdit}
                  style={{
                    marginLeft: "10px",
                    background: "#64748b",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <p>
                  Status: <span className="status">{task.status}</span>
                </p>

                {task.status !== "completed" && (
                  <button onClick={() => completeTask(task._id)}>
                    Mark Completed
                  </button>
                )}

                <button
                  onClick={() => startEdit(task)}
                  style={{
                    marginLeft: "10px",
                    background: "#f59e0b",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    marginLeft: "10px",
                    background: "#dc2626",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;