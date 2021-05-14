import React from "react";
import { makeStyles, AppBar, Toolbar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Movie Finder</Button>
          <Button color="inherit">Upcoming Movies</Button>
          <Button color="inherit">Popular Series</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
