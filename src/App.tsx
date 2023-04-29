import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import './App.css';
import { useEffect, useState } from 'react';
import { Users } from './services/user';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
  id: number;
  name: string;
  email: string;
  phone: number;
}

export function App() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const navigate = useNavigate();

  const increment = () => {
    setCounter(counter + 1);
  };

  const deccrement = () => {
    setCounter(counter - 1);
  };

  useEffect(() => {
    Users()
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToHookPage = () => {
    return navigate("/pageHook");
  };
  return (
    <Box>
      <Typography variant='h1'>Salut</Typography>
      <Button variant='contained' onClick={goToHookPage}>Go to hook Post</Button>
      <Box>
        {users.map((user) => (
          <Box key={user.id}>
            <Typography variant='h5'>{user.name}</Typography>
            <Typography variant='body1'>{user.email}</Typography>
            <Typography variant='body1'>{user.phone}</Typography>
          </Box>
        ))}
        <Typography>{counter}</Typography>
        <Button variant='contained' onClick={increment}>Add to Counter</Button>
        <br></br>
        <Button variant='contained' onClick={deccrement}>Decrese to Counter</Button>
      </Box>
    </Box>
  );
}

