import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";



function MyHeader() {
  const d = "M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z";
  const d2 = "M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029 C113.877,77.926,111.575,77.902,109.699,78.969z";



  const apiKey = "fe4cdf06ddd3985087ca7bae07a4bddb";
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])

  const getFetch = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((obj) => {
        setMovies(obj.results.slice(0, 5))

      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };
  useEffect(() => {
    getFetch();
  }, []);
  const getCircleColor = (rating, index) => {
    // Calcoliamo il numero massimo di cerchi da colorare, assumendo che il rating massimo sia 5
    const maxCircles = rating / 2;

    // Se l'indice è inferiore al numero massimo di cerchi, colora il cerchio di verde
    if (index < maxCircles) {
      // Se la parte decimale del rating è 0.5 e l'indice corrisponde all'ultimo cerchio, coloriamo la metà del cerchio di verde
      if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
        return "red";
      } else {
        return "red";
      }
    }
    // Altrimenti, colora il cerchio di grigio
    else {
      return "gray";
    }
  };


  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="text-white multiple"
      >
        {movies.length > 0 && (
          movies.map((film, index) =>
            <Carousel.Item key={index}>
              <div
                className="multiple carosel"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.backdrop_path})`,
                  backgroundSize: "cover",
                  height: "75vh",
                  width: "100%",
                  backgroundPositionY: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></div>
              <Carousel.Caption>
                <div className="d-flex gap-5 align-items-center">
                  <div className="text-start">
                    <h1 className="bebas text-start text-light">{film.title}</h1>
                    <div className="text-white d-flex align-items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(film.vote_average, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                             0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>

                      ))}
                      <span className="ms-3">{film.vote_average} Imdb rate  <i className="bi bi-badge-4k text-success fs-4"></i></span>
                    </div>
                      <p className="text-red fw-semibold pt-2 m-0">Release date  <span className="text-white">{film.release_date}</span></p>
                      <p className="text-red fw-semibold">Language<span className="text-white"> {film.original_language}</span></p>
                    <p className="mt-3 text-light"> {film.overview}</p>
                    <Button className="red" size="lg" onClick={() => { navigate(`/Detail/${film.id}`) }}>
                      <i className="bi bi-play-fill"></i> PLAY NOW
                    </Button>
                  </div>
                  <div className="d-flex gap-4 align-items-center text-white d-none d-md-flex" >
                    <div>   <svg fill="currentColor" height="90px" width="90px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 294.843 294.843" onClick={() => { navigate(`/Detail/${film.id}`) }}>
                      <g>
                        <path d={d} />
                        <path d={d2} />
                      </g>
                    </svg></div>
                    <h5 className="fw-light"> WATCH TRAILER</h5>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )

        )}



      </Carousel>


      <div className="container-xxxl pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-4 align-items-center">
            <h2>Tv Shows</h2>
            <div className=" ">
              <select className="p-1 bg-black text-white">
                <option value="0">Genres</option>
                <option value="1">Horror</option>
                <option value="2">War</option>
                <option value="3">Kids</option>
                <option value="4">Romantic</option>
                <option value="5">Fantasy</option>
              </select>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Button variant="outline-light" style={{ borderRadius: "0" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </Button>
            <Button
              variant="outline-light"
              className=" border-start-0"
              style={{ borderRadius: "0" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyHeader;
