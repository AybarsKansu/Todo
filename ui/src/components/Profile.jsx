import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function Profile({
  username,
  email: initialEmail,
  id,
  onProfileUpdate,
  onClose,
}) {
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email güncelle
  const handleEmailUpdate = async () => {
    if (!email) {
      toast.error("Email cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/users/update-email/${id}`, {
        username,
        email,
      });
      toast.success("Email updated!");
      if (onProfileUpdate) onProfileUpdate({ email });
    } catch (err) {
      toast.error("Email update failed!");
    }
    setLoading(false);
  };

  // Şifre güncelle
  const handlePasswordUpdate = async () => {
    if (!password || !newPassword) {
      toast.error("Please fill both password fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/users/update-password/${id}`, {
        oldPassword: password,
        password: newPassword
      });
      toast.success("Password updated!");
      setPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error("Password update failed!");
    }
    setLoading(false);
  };

  return (
    <Paper
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        position: "relative",
      }}
    >
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Username: <b>{username}</b>
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Email
        </Typography>
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handleEmailUpdate}
          disabled={loading}
        >
          Update Email
        </Button>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Change Password
        </Typography>
        <TextField
          fullWidth
          label="Current Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handlePasswordUpdate}
          disabled={loading}
        >
          Update Password
        </Button>
      </Box>
    </Paper>
  );
}
