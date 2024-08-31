import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TaskCard from './TaskCard'; // Assuming TaskCard is already created
import NewTaskCard from './NewTaskCard'; // Import NewTaskCard component
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function TaskContainer({ tasks }) {
  // State to manage new task visibility in each column
  const [newTaskVisible, setNewTaskVisible] = useState({
    'to-do': false,
    'in progress': false,
    'done': false
  });

  const handleAddTaskClick = (status) => {
    setNewTaskVisible({ ...newTaskVisible, [status]: true });
  };

  const handleCancelNewTask = (status) => {
    setNewTaskVisible({ ...newTaskVisible, [status]: false });
  };

  // Filter tasks by status
  const toDoTasks = tasks.filter(task => task.status === 'to-do');
  const inProgressTasks = tasks.filter(task => task.status === 'in progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <Grid container spacing={2}>
      {/* To-Do Column */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            backgroundColor: '#D5CCFF',
            borderRadius: 4,
            padding: 2,
            marginTop: 3,
            boxShadow: 3,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1.5 }}>
            <ContentPasteOutlinedIcon fontSize="medium" style={{ color: "#2B1887" }} sx={{ mb: 1, mr: 1 }} />
            <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
              To-Do
            </Typography>
          </Box>
          {toDoTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
          {newTaskVisible['to-do'] && (
            <NewTaskCard onCancel={() => handleCancelNewTask('to-do')} />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Tooltip title="Add New Task" arrow>
              <IconButton
                color="primary"
                onClick={() => handleAddTaskClick('to-do')}
                sx={{
                  backgroundColor: '#D5CCFF',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s, transform 0.3s',
                  '&:hover': {
                    backgroundColor: '#B2A7FF', // Lighter shade on hover
                    transform: 'scale(1.1)', // Slightly enlarge the button on hover
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Add shadow effect
                  }
                }}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Grid>

      {/* In-Progress Column */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            backgroundColor: '#D5CCFF',
            borderRadius: 4,
            padding: 2,
            marginTop: 3,
            boxShadow: 3,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1.5 }}>
            <PendingActionsOutlinedIcon fontSize="medium" style={{ color: "#2B1887" }} sx={{ mb: 1, mr: 1 }} />
            <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
              In Progress
            </Typography>
          </Box>
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
     
        </Box>
      </Grid>

      {/* Done Column */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            backgroundColor: '#D5CCFF',
            borderRadius: 4,
            padding: 2,
            marginTop: 3,
            boxShadow: 3,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 1.5 }}>
            <TaskOutlinedIcon fontSize="medium" style={{ color: "#2B1887" }} sx={{ mb: 1, mr: 1 }} />
            <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
              Done
            </Typography>
          </Box>
          {doneTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
