import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodaysTasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const today = new Date().toDateString();

        fetch(`http://localhost/php_server/tasks.php?user_id=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                const todayTasks = data.filter(task =>
                    new Date(task.date).toDateString() === today
                );
                setTasks(todayTasks);
            })
            .catch((error) => {
                console.error("Failed to fetch today's tasks:", error);
            });
    }, []);

    const handleEdit = (task, index) => {
        navigate('/edit-task', {
            state: { task, index },
        });
    };

    return (
        <div className="taskView">
            <div className='header-box'>
                <img src="/icons/yellow-circle.svg" alt="Today's task" width="15" height="15" />
                <h2>Today's Tasks</h2>
            </div>
            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index} className="task-card">
                            <div className="task-header">
                                <p>{task.name}</p>
                                <div className="badges">
                                    <span className={`status-badge ${task.status}`}>
                                        <span className="dot"></span>
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <p className="description">{task.description}</p>
                            <p className="date">
                                {new Date(task.date).toLocaleDateString('en-GB', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </p>
                            <button
                                className="edit-task-btn"
                                onClick={() => handleEdit(task, index)}
                            >
                                Edit
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tasks for today.</p>
                )}
            </div>
        </div>
    );
}

export default TodaysTasks;
