import React from "react";
import { Avatar, IconButton, Menu, MenuItem, Typography, Box, Divider, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function ProfilePicture({ username, logOut, handleDeleteUser, onProfileClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = () => {
    setAnchorEl(null);
    if (onProfileClick) onProfileClick();
  };

  return (
    <Box>
      <Tooltip title="Profile">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ bgcolor: "#1976d2", width: 40, height: 40 }}>
            {username?.[0]?.toUpperCase() || <PersonIcon />}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {username}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={logOut}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Log Out
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete User
        </MenuItem>
      </Menu>
    </Box>
  );
}