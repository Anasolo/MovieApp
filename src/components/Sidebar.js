import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MovieFilterOutlinedIcon from "@material-ui/icons/MovieFilterOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MovieIcon from "@material-ui/icons/Movie";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Movies from "./Movies";
import Finder from "./Finder";
import ViewDetails from "./ViewDetails";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(async () => {
    var data = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );
    setGenres(data.data.genres);
  }, []);

  const handleClick = (genre) => {
    history.push(`/genre/${genre.id}/${genre.name}`);
  };
  const handleOnClick = () => {
    console.log("MovieFinder");
    history.push(`/Finder`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MovieFilterOutlinedIcon />
          </IconButton>

          <Button color="inherit" onClick={() => handleOnClick()}>
            Movie Finder
          </Button>

          <Button color="inherit">Upcoming Movies</Button>
          <Button color="inherit">Popular Series</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {genres.map((genre) => (
            <ListItem button key={genre.id} onClick={() => handleClick(genre)}>
              <ListItemIcon>
                <MovieFilterOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={genre.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <Switch>
            <Route path="/genre/:id/:name">
              <Movies />
            </Route>
            <Route path="/Finder">
              <Finder />
            </Route>
            <Route path="/ViewDetails">
              <ViewDetails />
            </Route>
          </Switch>
        </Typography>
      </main>
    </div>
  );
}
