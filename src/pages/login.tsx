import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate('/');
    } catch (error: any) { // Explicitly typing error as any
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign in with Google to continue
      </Typography>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </Container>
  );
};
