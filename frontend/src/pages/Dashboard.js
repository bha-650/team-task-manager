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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(data);
    } catch (error) {
      console.log(error);
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
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(
        `${API}/api/tasks/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">Add Task</button>
      </form>

      <br />

      <div>
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <button onClick={() => completeTask(task._id)}>
              Complete
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;