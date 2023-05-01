import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserInfo, UserById } from "../services/user";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

export function UserPage() {
  const { id = "" } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  const navigate = useNavigate();

  const goToHookPage = () => {
    navigate("/pageHook");
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
    navigate("/");
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
      {userData && <Typography variant="h5">{userData.name}</Typography>}
      <Typography variant="h6">{userData?.email}</Typography>
      <Button onClick={goToHookPage} variant="contained">
        Go To PageHook
      </Button>
    </Box>
  );
}
