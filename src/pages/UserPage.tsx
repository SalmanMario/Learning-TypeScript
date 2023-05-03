import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserInfo, UserById } from "../services/user";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { AppRouteParams, routes, useNavigation } from "../routes/index";

export function UserPage() {
  const { id = "" } = useParams<AppRouteParams["userById"]>();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  const { navigate } = useNavigation();

  const goToHookPage = () => {
    navigate(routes.pageHook);
  };

  const {
    data: userDetails,
    loading,
    error,
  } = useFetchData(
    {
      fetcher: () => UserById(id),
      initialData: [],
    },
    []
  );

  useEffect(() => {
    UserById(id).then((data) => setUserData(data));
  }, [id]);

  if (!userDetails || loading) {
    return <CircularProgress />;
  }

  if (error) {
    navigate(routes.root);
  }

  //   useEffect(() => {
  //     if (id)
  //       UserById(id)
  //         .then((user) => {
  //           console.log(user);
  //           setUserData(user);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //   }, [id]);

  return (
    <Box>
      <Typography variant="h5">My name is {userData?.name}</Typography>
      <Typography variant="h6">You can contact me at {userData?.email}</Typography>
      <Typography variant="h6">I'm using the username {userData?.username}</Typography>
      <Typography variant="h6">I live on the street {userData?.address.street}</Typography>
      <Typography variant="h6">In the city {userData?.address.city}</Typography>
      <Typography variant="h6">
        This is my location {userData?.address.geo.lat} {userData?.address.geo.lng}
      </Typography>
      <Typography variant="h6">I use this phone number {userData?.phone}</Typography>
      <Typography variant="h6">My personal blog is {userData?.website}</Typography>
      <Typography variant="h6">Company i own {userData?.company.name}</Typography>
      <Typography variant="h6">Our slogan "{userData?.company.catchPhrase}"</Typography>
      <Button onClick={goToHookPage} variant="contained">
        Go To PageHook
      </Button>
    </Box>
  );
}
