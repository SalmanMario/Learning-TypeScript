/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import "./App.css";
import { routes, useNavigation } from "./routes/index";

export function App() {
  const { navigate } = useNavigation();

  const goToHookPage = () => {
    navigate(routes.pageHook);
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
