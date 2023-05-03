import { Box, Button, Typography } from "@mui/material";
import { routes, useNavigation } from "../routes";

export function MainPage() {
  const { navigate } = useNavigation();

  const goToHookPage = () => {
    navigate(routes.pageHook);
  };
  return (
    <Box>
      <Typography variant="h4">Home Page</Typography>
      <Button variant="contained" onClick={goToHookPage}>
        Go To Hook Page
      </Button>
    </Box>
  );
}
