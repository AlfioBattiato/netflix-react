import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function FilmDetails() {
const[details,setDetails]=useState([]);
  const [urlvideo, setUrlvideo] = useState("");
  const params = useParams();

  const getFetch = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${params.filmId}/videos?language=en-US`, options)
      .then(response => response.json())
      .then((response) => 
    {
      const officialTrailer = response.results.find(video => video.name === "Official Trailer");
      const officialTrailer2 = response.results.find(video => video.name === "Trailer");
      if (officialTrailer) {
        // Se trovi il trailer ufficiale, imposta setUrlvideo con il suo key
        setUrlvideo(officialTrailer.key)}else{
          setUrlvideo(officialTrailer2.key)
        }
    })
      .catch(err => console.error(err));
  };
  
  const getDetails=()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${params.filmId}?language=en-US`, options)
      .then(response => response.json())
      .then((response) =>{
        setDetails(response)
        console.log(response)})
      .catch(err => console.error(err));
  }
  useEffect(() => {
    getFetch();
    getDetails();
  }, [params]);

  return (
    <div className="container-xxxl">
      {urlvideo === "" ? (
        <h2 className=" pb-5 display-5 " style={{ color: "red" }}><i>Nessun trailer disponibile :</i></h2>
      ) : (
        <div id="video-container">
        <iframe width="100%" height="545" src={`https://www.youtube.com/embed/${urlvideo}`} frameBorder="0" allowFullScreen></iframe>
      </div>
      )}
      <Row>
        <Col xs={12} md={3} className="pb-3">
          <img
                src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
                alt="img"
            width="100%"
            style={{ objectFit: "cover", height: "100%" }}
          ></img>
        </Col>
        <Col xs={12} md={8}>
          <h1>{details.Title}</h1>
          <p className="fst-italic mb-1">Language: {details.Language}</p>
          <p className="fst-italic mb-1">Duration: {details.Runtime}</p>
          <p className="fst-italic mb-1">Released : {details.Released}</p>
          <p className="fst-italic mb-1">Awards : {details.Awards}</p>
          <p className="fst-italic mb-1">Writer : {details.Writer}</p>
          <p className="fst-italic mb-1">Director : {details.Director}</p>
          <p className="fst-italic mb-1">Genre : {details.Genre}</p>
          <p className="fst-italic mb-1">imdbRating : {details.imdbRating}</p>
          <p className="fst-italic mb-1">Plot : {details.Plot}</p>
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
