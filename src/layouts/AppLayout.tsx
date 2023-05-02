import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function AppLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Container>
    </Box>
  );
}
