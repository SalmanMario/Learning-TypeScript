/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { RoutesPages } from "./routes/index.tsx";
import { Box } from "@mui/material";

export function App() {
  return (
    <Box>
      <RoutesPages />;
    </Box>
  );
}
