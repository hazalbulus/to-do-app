import React, { useState, useEffect } from 'react';
import { getAllTasks, createTask, updateTask, deleteTask } from '../api/api';

import Grid from '@mui/material/Grid';
import TaskContainer from '../components/TaskContainer'; // Assuming TaskContainer is in the same folder
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

function Layout() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);



  const moveTask = async (taskId, newStatus) => {
    try {
      // Update the task status in the backend
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        await updateTask(taskId, {
          ...taskToUpdate,
          status: newStatus,
        });
      }
  
      // Update the task status in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
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
    status="todo"
    tasks={tasks}
    moveTask={moveTask}
    icon={ContentPasteOutlinedIcon}
  />
  <TaskContainer
    status="in_progress"
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
