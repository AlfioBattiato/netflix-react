import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function FilmDetails() {
  const [singleMovie, setSingleMovie] = useState({});
  const [immagine4k, setmmagine4k] = useState({});
  const [urlvideo, setUrlvideo] = useState("");
  const params = useParams();
  const url = "https://www.youtube.com/embed/j9OAEJI5Rww";

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
        console.log(data);
        setSingleMovie(data);
        const replaceNumberInString = data.Poster.replace("300", "1920");
        setmmagine4k(replaceNumberInString);
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };
  const getVideo = () => {
    fetch(`https://api.kinocheck.de/movies?imdb_id=${params.filmId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((data) => {
        if (data.trailer !== null) {
          setUrlvideo(
            "https://www.youtube.com/embed/" + data.trailer.youtube_video_id
          );
        }
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  useEffect(() => {
    getFetch();
    getVideo();
    console.log(urlvideo);
  }, []);

  return (
    <div className="container-xxxl">
      {urlvideo === "" ? (
        <h2 className=" pb-5 display-5 " style={{ color: "red" }}><i>Nessun trailer disponibile :(</i></h2>
      ) : (
        <div id="youtube-video-container" className="pb-5">
          <h2>Trailer</h2>
          <iframe
            width="100%"
            height="515"
            src={urlvideo}
            allowFullScreen="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <Row>
        <Col xs={12} md={3} className="pb-3">
          <img
            src={immagine4k}
            alt="img"
            width="100%"
            style={{ objectFit: "cover", height: "100%" }}
          ></img>
        </Col>
        <Col xs={12} md={8}>
          <h1>{singleMovie.Title}</h1>
          <p className="fst-italic mb-1">Language: {singleMovie.Language}</p>
          <p className="fst-italic mb-1">Duration: {singleMovie.Runtime}</p>
          <p className="fst-italic mb-1">Released : {singleMovie.Released}</p>
          <p className="fst-italic mb-1">Awards : {singleMovie.Awards}</p>
          <p className="fst-italic mb-1">Writer : {singleMovie.Writer}</p>
          <p className="fst-italic mb-1">Director : {singleMovie.Director}</p>
          <p className="fst-italic mb-1">Genre : {singleMovie.Genre}</p>
          <p className="fst-italic mb-1">imdbRating : {singleMovie.imdbRating}</p>
          <p className="fst-italic mb-1">Plot : {singleMovie.Plot}</p>
          <div className="d-flex align-items-center gap-2 mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle " viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg> 
            <p className="m-0 fw-bold">Add my list</p>
            </div>
        </Col>
      </Row>
    </div>
  );
}
export default FilmDetails;
