import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import List from "@material-ui/core/List";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
      backgroundColor: "white",
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [topMovies, setTopMovies] = useState([]);

  useEffect(async () => {
    var data = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );
    console.log("dataa", data.data.results);
    //setTopMovies(data.data.data);
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: "#4e5d6c",
          padding: "70px",
          width: "120ch",
        }}
      >
        <h2
          style={{
            color: "white",
          }}
        >
          Search For a Movie Using The Form Below
        </h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search Movies..."
            variant="outlined"
          />
        </form>
      </div>
      <h1>Top Rated Movies</h1>
      <List>
        {topMovies.map((genre) => (
          <ListItem button key={genre.id} >
            <ListItemIcon>
              <LocalMoviesIcon />
            </ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
