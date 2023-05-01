/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users } from "../services/user";
import { useFetchData } from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import { User } from "../services/user";

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchQuery, setSeachQuery] = useQueryParams({
    key: "search",
    initialValue: "",
    transformer: String,
    resetOn: "",
  });

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

  function filterUsers(userDetails: User[], searchQuery: string): User[] {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return userDetails;
    }
    return userDetails.filter((user) =>
      Object.values(user).some((value) => typeof value === "string" && value.toLowerCase().includes(query))
    );
  }

  console.log(userDetails);

  const filteredUserDetails = filterUsers(userDetails, searchQuery);

  return (
    <Box>
      <Typography variant="h2">Alta pagina</Typography>
      <Button variant="contained" onClick={goToMainPage}>
        Go to main Page
      </Button>
      <TextField label="search" value={searchQuery} onChange={(e) => setSeachQuery(e.target.value)}></TextField>
      {filteredUserDetails.length > 0 ? (
        filteredUserDetails.map((data) => (
          <Box key={data.id}>
            <Typography variant="body1">{data.id}</Typography>
            <Typography variant="h5">{data.username}</Typography>
            <Typography variant="h6">{data.name}</Typography>
            <Typography variant="body1">{data.phone}</Typography>
            <Typography variant="body1">{data.email}</Typography>
            <Typography variant="body1">{data.address.city}</Typography>
            <Typography variant="body1">{data.address.street}</Typography>
            <br />
          </Box>
        ))
      ) : (
        <Typography variant="h5">Information about user not found</Typography>
      )}
    </Box>
  );
}
