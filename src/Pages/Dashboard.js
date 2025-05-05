import React, { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import CreateTaskButton from '../Components/CreateTaskButton';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(`http://localhost/php_server/tasks.php?user_id=${user.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTasks(data); 
      } catch (err) {
        setError(err.message);
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  const today = new Date().toISOString().split('T')[0];
  const todaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.date).toISOString().split('T')[0];
    return taskDate === today;
  }).length;

  if (loading) {
    return <div className='dashboard'>Loading tasks...</div>;
  }

  if (error) {
    return <div className='dashboard'>Error: {error}</div>;
  }

  return (
    <div className='dashboard'>
      <div className='Section1'>
        <div className='welcome-card'>
          <div className='cardText'>
            <h1>Hello {JSON.parse(localStorage.getItem("user"))?.username}</h1>
            <p>It's good to see you again.</p>
          </div>
          <div className='cardImg'>
            <img src="/colorImg.svg" alt=".." />
          </div>
        </div>
        <div className='tools-card'>
          <SearchBar />
          <CreateTaskButton />
        </div>
      </div>

      <div className='Section2'>
        <div className='task-box-grid'>
          <div className='task-box'>
            <div className='header-box'>
              <img src="/icons/total_task.svg" alt="total task" width="50" height="50" />
              <h3>Total Tasks</h3>
            </div>
            <p>{totalTasks}</p>
          </div>
          <div className='task-box'>
            <div className='header-box'>
              <img src="/icons/pending_task.svg" alt="pending task" width="50" height="50" />
              <h3>Pending Tasks</h3>
            </div>
            <p>{pendingTasks}</p>
          </div>
          <div className='task-box'>
            <div className='header-box'>
              <img src="/icons/today_task.svg" alt="today task" width="50" height="50" />
              <h3>Today's Tasks</h3>
            </div>
            <p>{todaysTasks}</p>
          </div>
          <div className='task-box'>
            <div className='header-box'>
              <img src="/icons/completed_task.svg" alt="completed task" width="50" height="50" />
              <h3>Completed Tasks</h3>
            </div>
            <p>{completedTasks}</p>
          </div>
        </div>

        <div className="upcoming-task">
          <h2>Upcoming Task</h2>
          <div className="task-list">
            {[...tasks]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((task, index) => (
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
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
