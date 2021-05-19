import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginRight: "20px",
    marginBottom: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "300px",
    height: "500px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MovieCard({ movie }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let history = useHistory();
  const handleClick = () => {
    console.log("click");
    history.push(`/ViewDetails`);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="p">{`Release Date: ${movie.release_date}`}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={() => handleClick()}>View Details</Button>
      </CardActions>
    </Card>
  );
}
