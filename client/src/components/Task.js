import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Task() {
  const taskRef = useRef();
  const [tasks, setTasks] = useState([]);

  axios.defaults.baseURL = 'http://localhost:5000';

  const fetchTasks = async () => {
    const res = await axios.get('/fetchTasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    const text = taskRef.current.value.trim();
    if (text) {
      await axios.post('/addTask', { text });
      taskRef.current.value = '';
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`/deleteTask/${id}`);
    fetchTasks();
  };

  const editTask = async (id, oldText) => {
    const newText = prompt('Edit task:', oldText);
    if (newText !== null && newText.trim()) {
      await axios.put(`/updateTask/${id}`, { text: newText.trim() });
      fetchTasks();
    }
  };

  const handleStatusChange = async (taskId, value) => {
    if (value === 'Completed') {
      await axios.put(`/taskStatus/${taskId}`);
    } else if (value === 'Pending') {
      await axios.put(`/completeTask/${taskId}`, { completedAt: null });
    }
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1 className="header">Todo List</h1>

      <div className="todo-input-container">
        <label htmlFor="taskInput" className="input-label">Add a New Task</label>
        <div className="input-group">
          <input
            id="taskInput"
            ref={taskRef}
            type="text"
            placeholder="Enter your task"
            className="task-input"
          />
          <button className="add-button" onClick={addTask}>Add</button>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task, i) => {
          const createdDate = new Date(task.createdAt).toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          const completedDate = task.completedAt
            ? new Date(task.completedAt).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : null;

          return (
            <div key={i} className="task-card">
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <div className="task-actions">
                  <button onClick={() => editTask(task._id, task.text)}>📝Edit</button>
                  <button onClick={() => deleteTask(task._id)}>🚮Delete</button>
                </div>
              </div>
              <div className="task-meta">
                <span className="task-date">Created: {createdDate}</span>
              </div>
              <div className="task-meta">
                <select
                  className="task-status"
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  value={task.completedAt ? 'Completed' : 'Pending'}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
                {task.completedAt && (
                  <div className="completed-time">
                    <strong>Completed At:</strong> {completedDate}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Task;
