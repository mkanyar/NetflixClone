import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //if we leave the array empty where we put "movies"  it means run /////once when the row loads and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      // console.table(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //put it in a table
  // console.table(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developpers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
       setTrailerUrl("");
    }
    else  {
      //it gives sometimes an error if i dont include the empty string
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          //we pass in the url to get the video ID
          const urlParams = new URLSearchParams(new URL(url).search);
          // https://www.youtube.com/watch?v=VvqyUUROmJw&ab_channel=KevinPowell
          //we use v because it is the v that contains the id
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
   
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
