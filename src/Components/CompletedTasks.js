import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompletedTasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    
//e
    useEffect(() => {
            //  جلب المهام من ملف PHP
            fetch("http://localhost/php_server/tasks.php")
            .then(res => res.json())
            .then(data => {
              const completedTasks = data
                .map((task, index) => ({ ...task, globalIndex: index }))
                .filter(task => task.status === 'completed');
              setTasks(completedTasks);
            })
          
                .catch(error => {
                    console.error("Failed to fetch tasks:", error);
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
                <img src="/icons/green-circle.svg" alt="completed task" width="15" height="15" />
                <h2>Completed Tasks</h2>
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
                            <button className="edit-task-btn" onClick={() => handleEdit(task, task.globalIndex)}>
                                Edit
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No completed tasks.</p>
                )}
            </div>
        </div>
    );
}

export default CompletedTasks;
