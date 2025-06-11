import { Button, TextField } from "@mui/material";
import React from "react";

function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState(""); 
  const [tasks, setTasks] = React.useState([]);

  const handleSignup = () => {
    if (username && password && email) {
      if (props.addUser) {
        props.addUser({ email, username, password, tasks });
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <TextField
        id="email-signup"
        label="E-Mail"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
      />
      <br />
      <br />
      <TextField
        id="username-signup"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
      />
      <br />
      <br />
      <TextField
        id="password-signup"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
      />
      <br />
      <br />
      <Button variant="outlined" onClick={handleSignup}>
        SIGN UP
      </Button>
      <Button variant="outlined" style={{marginLeft: "15px"}} onClick={props.handleLoginBtnClick}>
        Login Page
      </Button>
    </div>
  );
}

export default Signup;
