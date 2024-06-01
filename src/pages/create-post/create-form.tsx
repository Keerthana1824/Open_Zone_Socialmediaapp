import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Title is necessary"),
    description: yup.string().required("Add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onCreatePost)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1"  style={{ fontWeight: 'semi-bold', color: '#176536', fontSize: '30px' }} gutterBottom>
          Create a Post
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin = "normal"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          InputLabelProps={{
            style: { fontSize: '18px' }, // Change font size of label
          }}
          InputProps={{
            style: { borderColor: 'green', borderRadius: "5px"}, // Change margin color
          }}
          
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={5}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          InputLabelProps={{
            style: { fontSize: '18px' },
          }}
          InputProps={{
            style: { borderColor: 'green' }, // Change margin color
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};
