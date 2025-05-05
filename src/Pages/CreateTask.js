import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // إرسال المهمة إلى سيرفر PHP
  const handleCreateTask = async () => {
    const newTask = {
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
        body: JSON.stringify(newTask)
      });

      const result = await response.json();
      alert(result.message || "Task saved!");
      navigate('/TaskManagement');
    } catch (error) {
      console.error("Error sending task:", error);
      alert("Failed to save task.");
    }
  };

  return (
    <div className="create-task-page">
      <h2>Create Task</h2>

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
          <option value="">Select</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group inline">
        <label>Get alert for this task</label>
        <input type="checkbox" checked={alertOn} onChange={() => setAlertOn(!alertOn)} />
      </div>

      <button className="create-task-btn" onClick={handleCreateTask}>
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;
