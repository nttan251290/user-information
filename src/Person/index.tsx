import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, Avatar } from '@mui/material';

interface UserDetail {
  id: number,
  name: string
  login: string,
  avatar_url: string,
  location: string
}

function Person() {
  const classes = useStyles();
  const { id } = useParams<{ id: any }>();

  const [user, setUser] = useState<UserDetail>({name: "", login: "", id: 0, avatar_url: "", location: ""});

  const handleDetailUser = useCallback(async (id: string) => {
    try {
      fetch(`https://api.github.com/users/${id}`)
      .then(res => res.json())
      .then(result => {
          setUser(result);
        },
      )
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleDetailUser(id);
  }, [handleDetailUser, id]);

  return (
    <Box display="flex" justifyContent="center" marginTop="40px">
      <Box className={classes.card}>
        <Avatar
          alt={user.name}
          src={user.avatar_url}
          sx={{ width: 70, height: 70 }}
        />
        <Box marginTop="20px">Name: {user.name}</Box>
        <Box marginTop="20px">Location: {user.location}</Box>
      </Box>
    </Box>
  );
}

export default Person;

const useStyles = makeStyles({
  card: {
    background: "white",
    textAlign: "center",

    "& .MuiAvatar-root": {
      margin: "0 auto",
    }
  },
});
