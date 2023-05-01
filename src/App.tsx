/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import "./App.css";
import { useNavigate } from "react-router-dom";

export function App() {
  const navigate = useNavigate();

  const goToHookPage = () => {
    navigate("/pageHook");
  };

  return (
    <Box>
      <Typography variant="h1">Salut</Typography>
      <Button variant="contained" onClick={goToHookPage}>
        Go to hook Post
      </Button>
    </Box>
  );
}
