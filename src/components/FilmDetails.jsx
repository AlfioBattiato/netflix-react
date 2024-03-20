import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams,  } from "react-router-dom";

function FilmDetails() {
  const [singleMovie, setSingleMovie] = useState({});
  const params = useParams();

  const getFetch = () => {
    fetch(`http://www.omdbapi.com/?apikey=96932c7f&i=${params.filmId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((data) => {
        setSingleMovie(data);
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  return (
    <div className="container-xxxl pt-5">
      <Row>
        <Col xs={3}>
          <img
            src={singleMovie.Poster}
            alt="img"
            width="100%"
            style={{ objectFit: "cover", height: "100%" }}
          ></img>
        </Col>
        <Col xs={9}>
          <h1>{singleMovie.Title}</h1>
          <p>Language: {singleMovie.Language}</p>
          <p>Duration: {singleMovie.Runtime}</p>
          <p>Released : {singleMovie.Released}</p>
          <p>Awards : {singleMovie.Awards}</p>
          <p>Writer : {singleMovie.Writer}</p>
          <p>Director : {singleMovie.Director}</p>
          <p>Genre : {singleMovie.Genre}</p>
          <p>imdbRating : {singleMovie.imdbRating}</p>
        </Col>
      </Row>
    </div>
  );
}
export default FilmDetails;
