import React from 'react';
import SearchBar from '../Components/SearchBar';
import CreateTaskButton from '../Components/CreateTaskButton';
import TodaysTasks from '../Components/TodaysTasks';
import PendingTasks from '../Components/PendingTasks';
import CompletedTasks from '../Components/CompletedTasks';

function TaskManagement() {
    return (
        <div>
            <div className="task-management">
                    <div className="task-management-header">
                        <SearchBar />
                        <CreateTaskButton />
                    </div>
                    <div className="task-management-content">
                         <TodaysTasks />
                         <PendingTasks />
                         <CompletedTasks />
                    </div>
                </div>
        </div>
    );
}

export default TaskManagement;