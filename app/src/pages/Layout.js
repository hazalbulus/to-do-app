
import React from 'react';
import TaskContainer from '../components/TaskContainer'; // Assuming TaskContainer is in the same folder

const tasks = [
  { id: 1, name: "Task 1", dueDate: "2024-08-30", rank: "high", description: "Task 1 description", createdDate: "2024-08-26", status: "to-do" },
  { id: 2, name: "Task 2", dueDate: "2024-08-31", rank: "medium", description: "Task 2 description", createdDate: "2024-08-25", status: "in progress" },
  { id: 3, name: "Task 3", dueDate: "2024-09-01", rank: "low", description: "Task 3 description", createdDate: "2024-08-24", status: "done" },
  // Add more tasks as needed
];

function Layout() {
  return (
    <div>
      <TaskContainer tasks={tasks} />
    </div>
  );
}

export default Layout;


