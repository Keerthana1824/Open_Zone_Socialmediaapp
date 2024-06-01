import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase"; // Ensure you are importing auth
import { Post } from "./post";
import { Container, Grid, CircularProgress, Typography, Box } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth"; // Hook for authentication state
import { keyframes } from "@emotion/react";

export interface IPost {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
}

// Define keyframes for the twirl animation
const twirl = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
`;

// Define a component to animate each letter
const AnimatedLetter: React.FC<{ letter: string; delay: number }> = ({ letter, delay }) => {
  return (
    <Typography
      component="span"
      sx={{
        display: "inline-block",
        fontSize: "50px",
        textAlign: "center",
        color: '#1AA350',
        animation: `${twirl} 1s ease-in-out ${delay}s forwards`,
        opacity: 0,
      }}
    >
      {letter}
    </Typography>
  );
};

// Define a component to display the animated word
const TwirlingWord: React.FC<{ word: string }> = ({ word }) => {
  return (
    <Box>
      {word.split("").map((letter, index) => (
        <AnimatedLetter key={index} letter={letter} delay={index * 0.5} />
      ))}
    </Box>
  );
};

export const Main: React.FC = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth); // Get the current authenticated user
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      setPostsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
      );
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      {user ? (
        postsList && postsList.length > 0 ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Posts
            </Typography>
            <Grid container spacing={4}>
              {postsList.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Post post={post} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography
            variant="h4"
            component="h1"
            style={{
              fontWeight: 'semi-bold',
              color: '#176536',
              fontSize: '30px',
              textAlign: 'center',
            }}
          >
            No posts yet..
          </Typography>
        )
      ) : (
        <><Box
            sx={{
              height: "auto",
              display: 'flex',
              justifyContent: 'center',
              padding: 0,
              alignItems: 'center',
              textAlign: 'center',
              overflow: 'hidden',
              margin: "25px 50px",
            }}
          >
            <TwirlingWord word="Openzone" />
          </Box><Typography
            variant="h4"
            component="h1"
            style={{
              fontWeight: 'bold',
              color: '#1AA350',
              fontFamily:"revert-layer",
              fontSize: '35px',
              textAlign: 'center',
              

            }}
          >
              Login to start exploring...
            </Typography></>
      )}
    </Container>
  );
};

export { Post };
