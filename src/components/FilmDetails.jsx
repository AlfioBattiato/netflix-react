import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Cast from "./Cast";
import Slider from "react-slick";
import Trailer from "./Trailer";
import { useDispatch, useSelector } from "react-redux";
import { addList, getReviews, similar } from "../redux/actions";
import Reviews from "./Reviews";
import MyCard from "./MyCard";
import { useParams } from "react-router-dom";

function FilmDetails() {
  const [details, setDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);
  const [KeyVideo, setKeyVideo] = useState("");
  const rew = useSelector(state => state.reviews);
  const simili = useSelector(state => state.similar);
  const [sendRate, setSendRate] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);

  const { type, id } = useParams();
  const dispatch = useDispatch();

  const getDetails = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      }
    };
    try {
      const videoResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, options);
      const videoData = await videoResponse.json();
      setVideo(videoData.results);

      if (videoData.results.length > 0) {
        const officialTrailer = videoData.results.find(video => video.name.includes("Official Trailer")) ||
          videoData.results.find(video => video.name.includes("Trailer"));
        setKeyVideo(officialTrailer ? officialTrailer.key : videoData.results[0].key);
      } else {
        setKeyVideo("");
      }

      const detailsResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options);
      const detailsData = await detailsResponse.json();
      setDetails(detailsData);

      const castResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options);
      const castData = await castResponse.json();
      setCast(castData.cast);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLikeDisabled(false);
    setSendRate(false);
    getDetails();
    dispatch(getReviews(type + "/", id));
    dispatch(similar(type + "/", id));
  }, [type, id,dispatch]);

  const getCircleColor = (rating, index) => {
    const maxCircles = rating / 2;
    if (index < maxCircles) {
      return "#CF9C0E";
    } else {
      return "gray";
    }
  };

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const handleLikeClick = () => {
    setLikeDisabled(true);
    setSendRate(true);
    dispatch(addList(details));
  };

  return (
    <>
      {details ? (
        <>
          <div className=" bg-details" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})` }}>
            <div className="container-fluid  pt-5 gradient ">
              <div className="container py-5">
                <Row className="gx-5">
                  <Col xs={12} md={4} className="pb-3">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${details.poster_path}.webp`}
                      alt="img"
                      width="100%"
                      style={{ objectFit: "contain", height: "100%" }}
                      className="rounded"
                      loading="lazy"
                    ></img>
                  </Col>
                  <Col xs={12} md={8}>
                    <h2 className="bebas">{details.title}</h2>
                    <div className="d-row ">
                      {details.genres && (
                        <>
                          {details.genres.map((e, index) =>
                            <span className="badge text-bg-danger me-1" key={index}>{e.name}</span>
                          )}
                          <div className="d-flex align-items-center">
                            <span className="me-3">Language: <span className="text-secondary">{details.original_language}</span></span>
                            <span className="me-3">Country: <span className="text-secondary">{details.origin_country[0]}</span></span>
                            <i className="bi bi-badge-4k text-success fs-3"></i>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="me-3">Production Companies: <span className="text-secondary">{details.production_companies.length > 0 ? details.production_companies[0].name : ""}</span></span>
                            <span className="me-3">Date: <span className="text-secondary">{details.release_date}</span></span>
                          </div>
                          <h3 className="mt-4">Overview</h3>
                          <div className="d-flex align-items-center mb-3">
                            <span className="me-3">{details.overview}</span>
                          </div>
                          {[...Array(5)].map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(details.vote_average, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                               0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          ))}
                          <span className="">Vote: <span className="text-secondary">{details.vote_average.toFixed(1)}</span></span>
                        </>
                      )}
                    </div>
                    <div className="position-relative">
                      <button className="btn btn-outline-success d-flex align-items-center gap-2 mt-5 " id="like" disabled={likeDisabled} onClick={handleLikeClick}>
                        <i className="bi bi-hand-thumbs-up-fill"></i>
                        <p className="m-0 fw-bold">Add to my list</p>
                      </button>
                      {sendRate && (
                        <p className="text-success mt-3" id="pRating">Film added to favorites </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              {cast.length > 0 && (
                <div className="container">
                  <h3 >Top Cast</h3>
                  <Slider {...settings}>
                    {cast.map((e, index) => (
                      <div className="" key={index}>
                        <Cast img={e.profile_path} character={e.character} name={e.name} ></Cast>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
          {KeyVideo === "" ? (
            <div className="container">
              <h3 className=" pb-5 mt-5" style={{ color: "red" }}>Nessun trailer disponibile </h3>
            </div>
          ) : (
            <div className="container">
              <h3 className="text-white mt-5">Official Videos  </h3>
              <Trailer video={video} funzione={setKeyVideo}></Trailer>
              <iframe width="100%" height="545" src={`https://www.youtube.com/embed/${KeyVideo}`} allowFullScreen title={KeyVideo}></iframe>
            </div>
          )}
          <div className="container-fluid">

            <div className="container">
              {rew && (<Reviews ></Reviews>)}
              {simili.length > 0 && (
                <>
                  <h3 className="mt-5">Similar Movie</h3>
                  <Slider {...settings}>
                    {simili.map((e, index) => (
                      e.poster_path && (
                        <div className="" key={index}>
                          <MyCard film={e} />
                        </div>
                      )
                    ))}
                  </Slider>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}

export default FilmDetails;
