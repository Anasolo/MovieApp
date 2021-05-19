import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  let { id, name } = useParams();

  useEffect(async () => {
    var data = await axios.get(
      `https://api.themoviedb.org/3/genre/${id}/movies?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );
    console.log("list", data.data.results);
    setMovies(data.data.results);
  }, [id]);

  return (
    <div className="App">
      MovieList {id}, {name}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {movies.map((movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
    </div>
  );
}
