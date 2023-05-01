/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserInfo, Users } from "../services/user";
import { useFetchData } from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import { ShowUsers } from "../components/ShowUser";

interface Querys<T> {
  key: string;
  initialValue: T;
  transformer: any;
  resetOn: string;
}

function useQueryParams<T>({ key, initialValue, transformer, resetOn }: Querys<T>) {
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
  const navigate = useNavigate();

  const [searchQuery, setSeachQuery] = useQueryParams({
    key: "search",
    initialValue: "",
    transformer: String,
    resetOn: "",
  });

  const [filteredUserDetails, setFilteredUserDetails] = useState<UserInfo[]>([]);

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
    navigate("/");
  }

  const goToMainPage = () => {
    return navigate("/");
  };

  return (
    <Box>
      <Typography variant="h2">Alta pagina</Typography>
      <Button variant="contained" onClick={goToMainPage}>
        Go to main Page
      </Button>
      <TextField label="search" value={searchQuery} onChange={(e) => setSeachQuery(e.target.value)}></TextField>
      {filteredUserDetails.length > 0 ? (
        <ShowUsers userDisplay={filteredUserDetails} />
      ) : (
        <Typography variant="h5">Information about user not found</Typography>
      )}
    </Box>
  );
}
