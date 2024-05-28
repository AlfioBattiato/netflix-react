import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

function MyHeader() {
  const location = useLocation();
  const isTvShowPath = location.pathname === "/Tvshow";
  const [header, setHeader] = useState([]);

  const nowplaying = useSelector((state) => state.nowplaying);
  const top_rated_tv = useSelector((state) => state.top_rated_tv);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate();

  useEffect(() => {
   
    if (isTvShowPath) {
      setHeader(top_rated_tv);
    } else {
      setHeader(nowplaying);
    }
  }, [isTvShowPath, nowplaying, top_rated_tv]);

  const getCircleColor = (rating, index) => {
    const maxCircles = rating / 2;
    if (index < maxCircles) {
      if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
        return "#078BCF";
      } else {
        return "#078BCF";
      }
    } else {
      return "gray";
    }
  };

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="text-white"
      >
        {header.length > 0 &&
          header.slice(0, 6).map((film, index) => (
            <Carousel.Item key={index}>
              <div
                className=" carosel"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.backdrop_path}.webp)`,
                  backgroundSize: "cover",
                  height: "75vh",
                  width: "100%",
                  backgroundPositionY: "center",
                  backgroundPositionX: "center",
                  display: "flex",
                  justifyContent: "center",
                  
                }}
              >
                <div className="gradient w-100 h-100"></div>
              </div>
              <Carousel.Caption>
                <div className="d-flex gap-5 align-items-center">
                  <div className="text-start">
                    <h1 className="bebas text-start text-light">
                      {film.title ? film.title : film.original_name}
                    </h1>
                    <div className="text-white d-flex align-items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill={getCircleColor(film.vote_average, index)}
                          className="bi bi-star-fill me-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      ))}
                      <span className="ms-3">
                        {film.vote_average} Imdb rate{" "}
                        <i className="bi bi-badge-4k text-success fs-4"></i>
                      </span>
                    </div>
                    <p className="text-blue fw-semibold pt-2 m-0">
                      Release date{" "}
                      <span className="text-white">
                        {film.release_date ? film.release_date : film.first_air_date}
                      </span>
                    </p>
                    <p className="text-blue fw-semibold">
                      Language<span className="text-white"> {film.original_language}</span>
                    </p>
                    <p className="mt-3 text-light">
                      {window.innerWidth <= 800
                        ? film.overview.substring(0, 100) + "..."
                        : film.overview}
                    </p>
                    <Button className="bg-light text-black border-0" size="lg" onClick={() => {
                      const url = `/Detail/${film.original_name ? 'tv/' + film.id : 'movie/' + film.id}`;
                      navigate(url);
                    }}>
                      <i className="bi bi-play-fill"></i>More details
                    </Button>
                  </div>
                  <div className="d-flex gap-4 align-items-center text-white d-none d-md-flex">
                    <div>
                      <svg
                        fill="currentColor"
                        height="90px"
                        width="90px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 294.843 294.843"
                        onClick={() => {
                          const url = `/Detail/${film.original_name ? 'tv/' + film.id : 'movie/' + film.id}`;
                          navigate(url);
                        }}
                      >
                        <g>
                          <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z" />
                          <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293                    c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029 C113.877,77.926,111.575,77.902,109.699,78.969z" />
                        </g>
                      </svg>
                    </div>
                    <h5 className="fw-light"> WATCH TRAILER</h5>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>

 
    </>
  );
}

export default MyHeader;

