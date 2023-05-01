import { Box, Grid } from "@mui/material";
import { UserCard } from "./UserCard";
import { UserInfo } from "../services/user";

interface ShowUserProps {
  userDisplay: UserInfo[];
}

export function ShowUsers({ userDisplay }: ShowUserProps) {
  return (
    <Box>
      <Grid container spacing={4}>
        {userDisplay.map((user) => (
          <UserCard key={user.id} data={user} />
        ))}
      </Grid>
    </Box>
  );
}
