
import React, { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TaskCard from './TaskCard';
import NewTaskCard from './NewTaskCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { useDrop } from 'react-dnd';
import { deleteTask,getAllTasks,createTask } from '../api/api'; // Adjust import path as necessary


export default function TaskContainer({ status, tasks, moveTask, icon: IconComponent }) {
  const [taskList, setTaskList] = useState(tasks);
  const [sortOrder, setSortOrder] = useState('create_date'); 

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    setTaskList(tasks); // Update task list when tasks prop changes
  }, [tasks]);
  const [newTaskVisible, setNewTaskVisible] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    window.location.reload();
  };

  const handleTaskUpdated = (updatedTask) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    window.location.reload();
  };
  const handleTaskAdded = async (newTask) => {
    try{
      await createTask(newTask); 

    } 
    catch(error) {
      console.error('Error creating task:', error);

      }
  
    setTaskList([...taskList, newTask]); // Update task list with the new task
    setNewTaskVisible(false); // Hide the new task form
    window.location.reload();

  };

  const [, dropRef] = useDrop({
    accept: 'task',
    drop: (item) => {
      moveTask(item.id, status); // Use the column's status to move the task
    },
  });

  const handleAddTaskClick = () => {
    setNewTaskVisible(true);
  };

  const handleCancelNewTask = () => {
    setNewTaskVisible(false);
  };


  const formatStatus = (status) => {
    switch (status) {
      case 'todo':
        return 'TO DO';
      case 'in_progress':
        return 'IN PROGRESS';
      case 'done':
        return 'DONE';
      default:
        return status;
    }
  };
  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Sort tasks based on the selected order
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'created_date') {
      return new Date(b.createDate) - new Date(a.createDate); // Sort by created date
    } else if (sortOrder === 'due_date') {
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
    }
    return 0;
  });
  return (

    <Grid item xs={12} md={4} ref={dropRef} >
      <Box
        sx={{
          backgroundColor: '#D5CCFF',
          borderRadius: 4,
          padding: 2,
          marginTop: 3,
          boxShadow: 3,
          minWidth:250,
          minHeight:300
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1.5 }}>
          <IconComponent fontSize="medium" style={{ color: "#2B1887" }} sx={{ mb: 1, mr: 1 }} />
          <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
            {formatStatus(status)}
          </Typography>
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOrder} onChange={handleSortOrderChange}>
          <MenuItem value="create_date">Create Date</MenuItem>
          <MenuItem value="due_date">Due Date</MenuItem>
        </Select>
      </FormControl>
      {sortedTasks.filter(task => task.status === status).map(task => (            
          <TaskCard
            key={task.id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleDelete} // Pass handleDelete function to TaskCard
            moveTask={moveTask} 
          />
        ))}
        {newTaskVisible && (
          <NewTaskCard onCancel={handleCancelNewTask} onTaskAdded={handleTaskAdded} />
        )}
       { status==="todo" && (<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Tooltip title="Add New Task" arrow>
            <IconButton
              color="primary"
              onClick={handleAddTaskClick}
              sx={{
                backgroundColor: '#D5CCFF',
                borderRadius: '50%',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  backgroundColor: '#B2A7FF',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>)}
      </Box>
    </Grid>
  );
}
