import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { UserInfo } from "../services/user";
import { routes, useNavigation } from "../routes/index";

export function UserCard({ data }: { data: UserInfo }) {
  const { navigate } = useNavigation();

  const goToUserPage = () => {
    navigate(routes.userById, { id: data.id.toString(), name: "string" });
  };
  return (
    <Grid sx={{ my: 4 }} item lg={3} md={4} sm={6} xs={12}>
      <Box>
        <Card sx={{ maxWidth: "100%", border: "2px solid blue" }}>
          <CardContent>
            <Typography
              sx={{
                height: "4rem",
                lineHeight: "2rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              gutterBottom
              variant="h5"
            >
              {data.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              {data.username}
            </Typography>
            <Typography gutterBottom variant="body1">
              {data.email}
            </Typography>
            <Typography gutterBottom variant="body1">
              {data.phone}
            </Typography>
            <Typography sx={{ mb: 5 }} variant="body1">
              {data.address.geo.lat} {data.address.geo.lng}
            </Typography>
            <Button onClick={goToUserPage} variant="contained">
              Learn more about user
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
