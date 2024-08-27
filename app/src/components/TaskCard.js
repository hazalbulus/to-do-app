import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function TaskCard({ task }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [rank, setRank] = useState(task.rank);

  const handleExpandClick = (event) => {
    event.stopPropagation();
    if (!editing) {
      setExpanded(!expanded);
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRankChange = (event) => {
    setRank(event.target.value);
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
        minWidth: 275,
        mb: 2,
        position: 'relative',
        backgroundColor: '#F4F2FF',
        borderRadius: 2, // Border radius
        padding: 2, // Padding for the card
        boxShadow: 2, // Optional: add a bit of shadow for depth
      }}
    >
      <Card variant="outlined" sx={{ boxShadow: 'none' }}>
        {/* Icon button for expanding/shrinking */}
        <IconButton
          onClick={handleExpandClick}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        <CardContent>
          {editing ? (
            <TextField
              fullWidth
              label="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 1 }}
            />
          ) : (
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
              {name}
            </Typography>
          )}

          {editing ? (
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 1 }}
            />
          ) : (
            <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
              Due date: {dueDate}
            </Typography>
          )}

          {editing ? (
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 1 }}
            />
          ) : (
            <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
              Rank: <span style={{ fontWeight: 'bold', color: rankColor(rank) }}>{rank}</span>
            </Typography>
          )}
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {editing ? (
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={handleStatusChange}>
                  <MenuItem value="to-do">To-Do</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography sx={{ mb: 1.5, color: '#2B1887' }}>
                Status: {status}
              </Typography>
            )}

            {editing ? (
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Rank</InputLabel>
                <Select value={rank} onChange={handleRankChange}>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            ) : null}

            <Typography variant="body2" sx={{ color: '#2B1887', mb: 1.5 }}>
              Description: {description}
            </Typography>
          </CardContent>
        </Collapse>

        {/* Conditionally render CardActions based on expanded state */}
        {expanded && (
          <CardActions sx={{ justifyContent: 'flex-end', position: 'absolute', bottom: 8, right: 8 }}>
            {editing ? (
              <IconButton size="small" color="success" onClick={handleEditClick}>
                <SaveAsIcon />
              </IconButton>
            ) : (
              <IconButton size="small" color="primary" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
