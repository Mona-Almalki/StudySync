import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";

function EditTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const taskIndex = location.state?.index;

  const [taskName, setTaskName] = useState(task?.name || "");
  const [taskDescription, setTaskDescription] = useState(task?.description || "");
  const [taskStatus, setTaskStatus] = useState(task?.status || "");
  const [alertOn, setAlertOn] = useState(task?.alert || false);
  const [selectedDate, setSelectedDate] = useState(task?.date ? new Date(task.date) : new Date());


  const handleSave = async () => {
    const updatedTask = {
      name: taskName,
      description: taskDescription,
      status: taskStatus,
      alert: alertOn,
      date: selectedDate
    };

    try {
      const response = await fetch("http://localhost/php_server/tasks.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "update",
          index: taskIndex,
          task: updatedTask
        })
      });

      const result = await response.json();
      alert(result.message || "Task updated!");
      navigate('/TaskManagement');
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update task.");
    }
  };


  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost/php_server/tasks.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "delete",
          index: taskIndex
        })
      });

      const result = await response.json();
      alert(result.message || "Task deleted!");
      navigate('/TaskManagement');
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="create-task-page">
      <h2>Edit Task</h2>

      <div className="calendar-container">
        <label>Pick a date</label>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className="form-group">
        <label>Task Name</label>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Task Description</label>
        <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Task Status</label>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group inline">
        <label>Get alert for this task</label>
        <input type="checkbox" checked={alertOn} onChange={() => setAlertOn(!alertOn)} />
      </div>

      <div className="button-group">
        <button className="create-task-btn" onClick={handleSave} style={{ marginRight: "10px" }}>
          Save Change
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: "12px 25px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default EditTask;
