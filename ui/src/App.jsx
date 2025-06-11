import React from "react";
import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Box,
  FormControlLabel,
} from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import ProfilePicture from "./components/ProfilePicture";
import Profile from "./components/Profile";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State for managing users and form visibility
  const [users, setUsers] = React.useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [signup, setSignup] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(() => {
    return localStorage.getItem("currentUser") || "";
  });

  // Dark mode state
  const [darkMode, setDarkMode] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);

  // Create the theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        paper: darkMode ? "#1e1e1e" : "#fff",
        default: darkMode ? "#121212" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
    },
  });

  // Kullanıcı listesini güncelleyen yardımcı fonksiyon
  const refreshUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };

  async function addUser(user) {
    try{
      const response = await axios.post("http://localhost:8080/api/users/register", {
        username: user.username,
        password: user.password,
        email: user.email,
      });
      console.log("Login response:", response.data.username);
      console.log("Login response:", response.data.id);
      console.log("Login response:", response.data.email);
      await refreshUsers();
      toast.success("Sign up successful! You can now log in.");
    } catch (error) {
      toast.error(
        "Sign up failed!"
      );
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  const handleSignupBtnClick = () => {
    setSignup(true);
    setLogin(false);
  };

  const handleLoginBackBtnClick = () => {
    setSignup(false);
    setLogin(true);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username: username,
        password: password
      });

      if(response.data){
        setIsLogin(true);
        setCurrentUser(username);
        localStorage.setItem("currentUser", username);
        toast.success("Login successful!");
      }
      response.data.id;
    } catch (error) {
      toast.error(
        "Login failed!"
      );
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  const logOut = () => {
    setIsLogin(false);
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    toast.info("Logged out.");
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${id}`);
      logOut();
      await refreshUsers();
      localStorage.removeItem("currentUser");
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "User deletion failed!"
      );
      logOut();
      await refreshUsers();
      localStorage.removeItem("currentUser");
    }
  };

  // Kullanıcının emailini bul
  const currentUserObj = users.find(user => user.username === currentUser);
  const currentUserEmail = currentUserObj?.email || "";
  const currentUserId = currentUserObj?.id;

  React.useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-left" autoClose={1000} />
      <Container>
        <Box display="flex" justifyContent="right" mt={2} mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            }
            label="Dark Mode"
          />
          {isLogin && (
            <ProfilePicture
              username={currentUser}
              logOut={logOut}
              handleDeleteUser={() => handleDeleteUser(users.find(user => user.username === currentUser).id)}
              onProfileClick={() => setShowProfile(true)}
            />
          )}
        </Box>
      </Container>
      {isLogin ? (
        showProfile ? (
          <Profile
            username={currentUser}
            email={currentUserEmail}
            id={currentUserId}
            onProfileUpdate={refreshUsers}
            onClose={() => setShowProfile(false)}
          />
        ) : (
          <Main username={currentUser} />
        )
      ) : (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> 
          {login && (
            <Login
              handleLogin={handleLogin}
              users={users}
              handleSignupBtnClick={handleSignupBtnClick}
            />
          )}
          {signup && (
            <Signup
              handleLogin={handleLogin}
              addUser={addUser}
              handleLoginBtnClick={handleLoginBackBtnClick}
            />
          )}
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;
