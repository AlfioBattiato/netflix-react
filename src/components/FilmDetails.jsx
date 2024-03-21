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
        if(data.trailer!==null){
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
        <h2 className=" pb-5 display-5 " style={{color:"red"}}><i>Nessun trailer disponibile :(</i></h2>
      ) : (
        <div id="youtube-video-container" className="pb-5">
          <h2>Trailer</h2>
          <iframe
            width="100%"
            height="515"
            src={urlvideo}
            allowfullscreen="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <Row>
        <Col xs={12} sm={3}>
          <img
            src={immagine4k}
            alt="img"
            width="100%"
            style={{ objectFit: "cover", height: "100%" }}
          ></img>
        </Col>
        <Col xs={12} sm={8}>
          <h1>{singleMovie.Title}</h1>
          <p>Language: {singleMovie.Language}</p>
          <p>Duration: {singleMovie.Runtime}</p>
          <p>Released : {singleMovie.Released}</p>
          <p>Awards : {singleMovie.Awards}</p>
          <p>Writer : {singleMovie.Writer}</p>
          <p>Director : {singleMovie.Director}</p>
          <p>Genre : {singleMovie.Genre}</p>
          <p>imdbRating : {singleMovie.imdbRating}</p>
          <p>Plot : {singleMovie.Plot}</p>
        </Col>
      </Row>
    </div>
  );
}
export default FilmDetails;
