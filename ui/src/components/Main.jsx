import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddTask from "./AddTask";
import axios from "axios";

function Row(props) {
  const { row, onDelete, onComplete, showComplete, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.dueDate}</TableCell>
        <TableCell>{row.isDone ? "✅ Yes" : "❌ No"}</TableCell>
        <TableCell>
          {row.isDone ? (
            <Typography variant="body2" color="success">
              Completed ✅
            </Typography>
          ) : (
            showComplete && (
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => onComplete(row.number)} // Now onComplete is defined via props
              >
                Complete
              </Button>
            )
          )}
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(row.name)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Description:</strong> {row.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Entry Date:</strong> {row.entryDate}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    entryDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Main({ username }) {
  const theme = useTheme();

  // username artık props'tan geliyor
  const storageKey = `tasks_${username}`;
  // tasks state'ini username değiştiğinde güncelle
  const [tasks, setTasks] = React.useState([]);

  const init = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/user/${username}`
      );

      if (response.data) {
        if (response.data) {
          // Backend'den gelen tasklara details ekle
          const normalizedTasks = response.data.map((task) => ({
            ...task,
            number: task.id, // id'yi number olarak kullan
            isDone: task.done,
            details: task.details || [], // details yoksa boş dizi
          }));
          setTasks(normalizedTasks);
        }
      } else {
        console.log("cannot get tasks");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  React.useEffect(() => {
    init();
  }, [tasks]);

  React.useEffect(() => {
    // username değişirse ilgili taskleri yükle
    const saved = localStorage.getItem(storageKey);
    setTasks(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const [tab, setTab] = React.useState(1);
  const today = new Date().toISOString().slice(0, 10);
  const [showTaskForm, setShowTaskForm] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");
  const [newTaskDueDate, setNewTaskDueDate] = React.useState(today);

  // Filter tasks into tabs
  const filteredRows = [
    tasks.filter((row) => !row.isDone && row.dueDate === today), // Today
    tasks.filter((row) => !row.isDone && row.dueDate > today), // Pending
    tasks.filter((row) => !row.isDone && row.dueDate < today), // Overdue
    tasks.filter((row) => row.isDone), // Completed
  ];

  const tabLabels = ["Today", "Pending", "Overdue", "Completed"];
  const handleAddTask = async (name, description, dueDate) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/tasks/user/${username}`,
        {
          name,
          description,
          dueDate: new Date(dueDate),
        }
      );
    } catch (error) {
      console.error("Task eklenirken hata:", error);
    }
  };


  const handleDeleteTask = async (name) => {
    try {
      const ts = await axios.get(`http://localhost:8080/api/tasks/task/${name}`);
      await axios.delete(`http://localhost:8080/api/tasks/${ts.data.id}`);
      init()
    } catch (error) {
      console.error("Task silinirken hata:", error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/tasks/${id}/complete`);
      init()
    } catch (error) {
      console.error("Task tamamlanırken hata:", error);
    }
  };

  const [userId, setUserId] = React.useState(() => {
    return localStorage.getItem("currentUser") || "";
  });

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/tasks/user/${username}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Taskler yüklenirken hata:", error);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {/* AddTask butonu tabların üstünde, her zaman görünür */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "900px",
          mb: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? "Hide Add Task" : "+ Task"}
        </Button>
      </Box>

      {/* Use a ternary operator to show the AddTask component or the Tasks view */}
      {showTaskForm ? (
        <AddTask
          addTask={handleAddTask}
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
          newTaskDescription={newTaskDescription}
          setNewTaskDescription={setNewTaskDescription}
          newTaskDueDate={newTaskDueDate}
          setNewTaskDueDate={setNewTaskDueDate}
        />
      ) : (
        <>
          {/* Tabs for filtering tasks */}
          <Box
            sx={{
              width: "fit-content", // Sadece tabler kadar genişlik
              borderRadius: 2,
              mb: 3,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.paper
                  : "#d3ded3",
              overflow: "hidden",
              mx: "auto", // Ortalamak için
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              aria-label="task tabs"
              variant="standard" // fullWidth veya scrollable değil
              TabIndicatorProps={{ style: { display: "none" } }}
              sx={{
                "& .MuiTab-root": {
                  minWidth: 90,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.paper
                      : "#d3ded3",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "#111",
                  fontWeight: "normal",
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  ":hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.dark
                        : "#195c34",
                  },
                },
                "& .Mui-selected": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "#195c34",
                  color: "#fff !important",
                  fontWeight: "bold",
                },
                "& .MuiTabs-flexContainer": {
                  borderRadius: 2,
                  overflow: "hidden",
                },
              }}
            >
              {tabLabels.map((label, idx) => (
                <Tab label={label} key={label} {...a11yProps(idx)} />
              ))}
            </Tabs>
          </Box>

          {/* Display Table with tasks */}
          <TableContainer
            component={Paper}
            sx={{ width: "80%", maxWidth: "900px", borderRadius: 2 }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Task #</TableCell>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Completed?</TableCell>
                  <TableCell>Complete</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows[tab].length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No tasks found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows[tab].map((task, idx) => (
                    <Row
                      key={task.number}
                      row={task}
                      index={idx}
                      onDelete={() => handleDeleteTask(task.name)}
                      onComplete={handleCompleteTask}
                      showComplete={tab !== 2}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
