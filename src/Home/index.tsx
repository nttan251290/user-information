import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Avatar, Chip } from '@mui/material';
import { makeStyles } from "@mui/styles";

interface UserItem {
  id: number,
  login: string,
  avatar_url: string,
}

function Home() {
  const classes = useStyles();
  const [listUser, setListUser] = useState<UserItem[]>([]);

  const handleGetListUser = useCallback(async () => {
    try {
      fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(result => {
          setListUser(result.slice(0, 5))
        },
      )
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleGetListUser();
  }, [handleGetListUser]);

  return (
    <Box display="flex" justifyContent="center" marginTop="30px">
      {listUser.map((user, index) => (
        <Box key={index} className={classes.user}>
          <Link to={`/${user.login}`}>
            <Chip
              avatar={<Avatar alt={user.login} src={user.avatar_url} />}
              label={user.login}
              variant="outlined"
            />
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default Home;

const useStyles = makeStyles({
  user: {
    margin: "0 15px",

    "& a": {
      display: "block",
    },

    "& .MuiChip-root": {
      padding: 20,
      cursor: "pointer",
    }
  },
});