import { Button, TextField } from "@mui/material";
import React from "react";

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLoginClick = () => {
    props.handleLogin(username, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoginClick()}
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoginClick()}
        />
        <br />
        <br />
        <Button variant="outlined" onClick={handleLoginClick}>
          Login
        </Button>
        <Button variant="outlined" style={{marginLeft: "15px"}} onClick={props.handleSignupBtnClick}>
          Sign Up Page
        </Button>
      </form>
    </div>
  );
}

export default Login;
