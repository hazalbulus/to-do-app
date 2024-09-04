
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TaskCard from './TaskCard';
import NewTaskCard from './NewTaskCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { useDrop } from 'react-dnd';

export default function TaskContainer({ status, tasks, moveTask, icon: IconComponent }) {
  const [newTaskVisible, setNewTaskVisible] = useState(false);

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

  // Filter tasks based on the status passed in as props
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <Grid item xs={12} md={4} ref={dropRef} >
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
          <IconComponent fontSize="medium" style={{ color: "#2B1887" }} sx={{ mb: 1, mr: 1 }} />
          <Typography variant="h6" align="center" fontWeight="bold" color="#2B1887" gutterBottom>
            {status.toUpperCase()}
          </Typography>
        </Box>
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {newTaskVisible && (
          <NewTaskCard onCancel={handleCancelNewTask} />
        )}
       { status==="to-do" && (<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
