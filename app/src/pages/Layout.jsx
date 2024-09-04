import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TaskContainer from '../components/TaskContainer'; // Assuming TaskContainer is in the same folder
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

function Layout() {

  const [tasks, setTasks] = useState([
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
  ])

  // Function to move tasks between columns
  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  const moveCard = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
<Grid
  container
  spacing={4}
  sx={{
    ml:16
  }}
>
  <TaskContainer
    status="to-do"
    tasks={tasks}
    moveTask={moveTask}
    icon={ContentPasteOutlinedIcon}
  />
  <TaskContainer
    status="in progress"
    tasks={tasks}
    moveTask={moveTask}
    icon={PendingActionsOutlinedIcon}
  />
  <TaskContainer
    status="done"
    tasks={tasks}
    moveTask={moveTask}
    icon={TaskOutlinedIcon}
  />
</Grid>

  );
}
export default Layout;
