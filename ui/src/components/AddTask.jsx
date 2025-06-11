// AddTask.jsx
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function AddTask({ addTask }) {
  const theme = useTheme();
  const today = new Date().toISOString().slice(0, 10);

  // State for form fields
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState(today);
  
  // Function to handle adding a task.
  const handleAddTask = async () => {
    if (!newTaskName.trim() || !newTaskDueDate) {
      alert("Please provide at least a task name and a due date.");
      return;
    } 
    
    addTask(newTaskName, newTaskDescription, newTaskDueDate);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDueDate(today);
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: 900,
        mb: 3,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      {/* Move onSubmit handler to the form element */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Task Name"
          value={newTaskName}
          type="text"
          onChange={(e) => {
            setNewTaskName(e.target.value);
          }}
        />
        <TextField
          label="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
