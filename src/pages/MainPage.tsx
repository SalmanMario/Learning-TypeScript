import { Box, Button, Typography } from "@mui/material";
import { routes, useNavigation } from "../routes";

export function MainPage() {
  const { navigate } = useNavigation();

  const goToHookPage = () => {
    navigate(routes.pageHook);
  };

  const goToTestPage = () => {
    navigate(routes.testPage, { id: "3" });
  };
  return (
    <Box>
      <Typography variant="h4">Home Page</Typography>
      <Button variant="contained" onClick={goToHookPage}>
        Go To Hook Page
      </Button>
      <Button variant="contained" onClick={goToTestPage}>
        Go To Test Page
      </Button>
    </Box>
  );
}
