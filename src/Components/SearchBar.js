import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

     useEffect(() => {
            fetch("http://localhost/php_server/tasks.php")
                .then(res => res.json())
                .then(data => {
                    setTasks(data);
                })
                .catch(error => {
                    console.error("Failed to fetch tasks:", error);
                });
        }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredTasks([]);
            return;
        }

        const filtered = tasks.filter(task =>
            task.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [search, tasks]);

    return (
        <div className='search-bar'>
            <div className='search'>
                <img src="/icons/search.svg" alt="Search" width="30px" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            {search.trim() !== '' && (
                <div className="search-results">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <div key={index} className="task-card">
                                <h3>{task.name}</h3>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <p>Date: {new Date(task.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
