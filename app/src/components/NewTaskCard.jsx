import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { createTask } from '../api/api'; 

export default function NewTaskCard({ onCancel,onTaskAdded }) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rank, setRank] = useState('medium');
  const [status, setStatus] = useState('todo');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRankChange = (event) => {
    setRank(event.target.value);
  };
  // const [newTask, setNewTask] = useState({});
  const handleSaveClick = async () => {
    if (window.confirm('Are you sure you want to add this task?')) {
      const newTask = {name, description, dueDate, rank, status}
      onTaskAdded(newTask); // Call the delete function passed as a prop
    }
  };

  const rankColor = (rank) => {
    switch (rank) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <Box
      sx={{
        minWidth: 300,
        mb: 2,
        position: 'relative',
        backgroundColor: '#F4F2FF',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          boxShadow: '2',
          backgroundColor: '#F4F2FF',
          borderRadius: 2,
        }}
      >

        <CardContent>
            <Typography sx={{ mb: 1.5, color: '#2B1887',fontWeight: 'bold' }} > Add a new task</Typography>
          <TextField
            fullWidth
            label="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 1 }}
          />

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Rank</InputLabel>
            <Select value={rank} onChange={handleRankChange}>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange}>
              <MenuItem value="todo">To-Do</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#2B1887', mb: 1.5 }}>
              Description: {description}
            </Typography>
            <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
              Due date: {dayjs(dueDate).format('DD MMMM')}
            </Typography>
            <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
              Rank: <span style={{ fontWeight: 'bold', color: rankColor(rank) }}>{rank.toUpperCase()}</span>
            </Typography>
            <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
              Status: {status.toUpperCase()}
            </Typography>
          </CardContent>
        </Collapse>
        <br/>
        {/* Conditionally render CardActions */}
        <CardActions
          sx={{ justifyContent: 'flex-end', position: 'absolute', bottom: 8, right: 8 }}
        >
          <IconButton size="small" color="success" onClick={handleSaveClick}>
            <SaveAsIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
