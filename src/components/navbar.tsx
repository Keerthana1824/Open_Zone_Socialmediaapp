import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 5, display: "flex", gap: 5 }}>
          <Button variant = {"contained"} component={Link} to="/" style={{ color: '#ffffff'}}>
            Home
          </Button>
          {!user ? (
            <Button variant = {"contained"} component={Link} to="/login" style={{ color: '#ffffff' }}>
              Login
            </Button>
          ) : (
            <Button variant = {"contained"} component={Link} to="/createpost" style={{ color: '#ffffff' }}>
              Create Post
            </Button>
          )}
        </Box>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>{user?.displayName}</Typography>
            <Avatar src={user?.photoURL || ""} />
            <Button variant = {"contained"} style={{ color: '#ffffff' }} onClick={signUserOut}>
              Sign Out
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
