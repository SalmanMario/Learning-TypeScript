/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserInfo, Users } from "../services/user";
import { useFetchData } from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import { ShowUsers } from "../components/ShowUser";
import { routes, useNavigation } from "../routes/index";

interface Querys<T> {
  key: string;
  initialValue: T;
  transformer: any;
  resetOn: string;
}

function useQueryParams<T>({
  key,
  initialValue,
  transformer,
  resetOn,
}: Querys<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentElement = transformer(searchParams.get(key) ?? initialValue);

  const [state, setState] = useState(currentElement);

  useEffect(() => {
    setState(currentElement);
  }, [currentElement]);

  function handleStateChange(newValue: string) {
    setState(newValue);
    setSearchParams((query) => {
      if (query.has(key)) {
        query.set(key, newValue);
      } else {
        query.append(key, newValue);
      }
      if (resetOn === transformer(newValue)) {
        query.delete(key);
      }
      return query;
    });
  }
  return [state, handleStateChange];
}

export function PageHook() {
  const { navigate } = useNavigation();

  const [searchQuery, setSeachQuery] = useQueryParams({
    key: "search",
    initialValue: "",
    transformer: String,
    resetOn: "",
  });

  const [filteredUserDetails, setFilteredUserDetails] = useState<UserInfo[]>(
    []
  );

  useEffect(() => {
    Users(searchQuery).then((data) => setFilteredUserDetails(data));
  }, [searchQuery]);

  const {
    data: userDetails,
    loading,
    error,
  } = useFetchData(
    {
      fetcher: () => Users(searchQuery),
      initialData: [],
    },
    []
  );

  if (!userDetails || loading) {
    return <CircularProgress />;
  }

  if (error) {
    navigate(routes.root);
  }

  const goToMainPage = () => {
    return navigate(routes.root);
  };

  return (
    <Box>
      <Typography textAlign="center" my={4} variant="h3">
        Page Hook with Search bar
      </Typography>
      <Grid container>
        <Grid item md={6}>
          <TextField
            label="search"
            value={searchQuery}
            onChange={(e) => setSeachQuery(e.target.value)}
          ></TextField>
        </Grid>
        <Grid
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
          item
          md={6}
        >
          <Button variant="contained" onClick={goToMainPage}>
            Go to main Page
          </Button>
        </Grid>
      </Grid>
      {filteredUserDetails.length > 0 ? (
        <ShowUsers userDisplay={filteredUserDetails} />
      ) : (
        <Typography variant="h5">Information about user not found</Typography>
      )}
    </Box>
  );
}
