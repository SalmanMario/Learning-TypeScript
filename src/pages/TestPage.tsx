import { Box, Button, Typography } from "@mui/material";
import { AppRouteParams, routes, useNavigation } from "../routes";
import { useParams } from "react-router-dom";

export function TestPage() {
  const { navigate } = useNavigation();

  const { id } = useParams<AppRouteParams["testPage"]>();

  const goToHome = () => {
    navigate(routes.root);
  };

  return (
    <Box>
      <Typography variant="h5">Page with number {id}</Typography>
      <Button variant="contained" onClick={goToHome}>
        Home Page
      </Button>
    </Box>
  );
}
