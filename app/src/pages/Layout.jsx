
import React from 'react';
import TaskContainer from '../components/TaskContainer'; // Assuming TaskContainer is in the same folder

const tasks = [
    { id: 1, name: "Task 1", dueDate: "2024-08-30", rank: "high", description: "Task 1 description", createdDate: "2024-08-26", status: "to-do" },
    { id: 2, name: "Task 2", dueDate: "2024-08-31", rank: "medium", description: "Task 2 description", createdDate: "2024-08-25", status: "in progress" },
    { id: 3, name: "Task 3", dueDate: "2024-09-01", rank: "low", description: "Task 3 description", createdDate: "2024-08-24", status: "done" },
    { id: 4, name: "Task 4", dueDate: "2024-08-30", rank: "high", description: "Task 4 description", createdDate: "2024-08-26", status: "to-do" },
    { id: 5, name: "Task 5", dueDate: "2024-08-31", rank: "medium", description: "Task 5 description", createdDate: "2024-08-25", status: "in progress" },
    { id: 6, name: "Task 6", dueDate: "2024-09-01", rank: "low", description: "Task 6 description", createdDate: "2024-08-24", status: "done" },
    { id: 7, name: "Task 7", dueDate: "2024-08-30", rank: "high", description: "Task 7 description", createdDate: "2024-08-26", status: "done" },
    { id: 8, name: "Task 8", dueDate: "2024-08-31", rank: "medium", description: "Task 8 description", createdDate: "2024-08-25", status: "in progress" },
    { id: 9, name: "Task 9", dueDate: "2024-09-01", rank: "low", description: "Task 9 description", createdDate: "2024-08-24", status: "done" },
    { id: 10, name: "Task 10", dueDate: "2024-08-30", rank: "high", description: "Task 10 description", createdDate: "2024-08-26", status: "to-do" },
    { id: 11, name: "Task 11", dueDate: "2024-08-31", rank: "medium", description: "Task 11 description", createdDate: "2024-08-25", status: "in progress" },
    { id: 12, name: "Task 12", dueDate: "2024-09-01", rank: "low", description: "Task 12 description", createdDate: "2024-08-24", status: "to-do" },
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


