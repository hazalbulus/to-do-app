import React from 'react';
import Grid from '@mui/material/Grid';
import TaskCard from './TaskCard'; // Assuming TaskCard is already created
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TaskIcon from '@mui/icons-material/Task';

export default function TaskContainer({ tasks }) {
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
            borderRadius: 4, // Corner radius
            padding: 2, // Padding for the container
            marginLeft:3,
            marginTop:3,
            boxShadow: 3, // Optional: add a bit of shadow for depth
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
            To-Do
          </Typography>
          {toDoTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Grid>

      {/* In-Progress Column */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            backgroundColor: '#D5CCFF',
            borderRadius: 4,
            padding: 2,
            marginLeft:3,
            marginTop:3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
            In Progress
          </Typography>
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
            marginLeft:3,
            marginRight:3,
            marginTop:3,
            boxShadow: 3,
          }}
        >
            
          <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
          <TaskIcon fontSize="large"/>

            Done
          </Typography>
          {doneTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
