import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Cast from "./Cast";
import { useDispatch, useSelector } from "react-redux";
import { addList, getReviews, similar } from "../redux/actions";
import Reviews from "./Reviews";
import MyCard from "./MyCard";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MySpinner from "./MySpinner";

function FilmDetails() {
  const [details, setDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);
  const [KeyVideo, setKeyVideo] = useState("");
  const rew = useSelector(state => state.reviews);
  const simili = useSelector(state => state.similar);
  const [sendRate, setSendRate] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [spinner, setSpinner] = useState(true);

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
    setSpinner(false);
  }, [type, id, dispatch]);

  const getCircleColor = (rating, index) => {
    const maxCircles = rating / 2;
    if (index < maxCircles) {
      return "#CF9C0E";
    } else {
      return "gray";
    }
  };


  const handleLikeClick = () => {
    setLikeDisabled(true);
    setSendRate(true);
    dispatch(addList(details));
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 6,
      slidesToSlide: 6
    },
    desktop: {
      breakpoint: { max: 1400, min: 900 },
      items: 4,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 900, min: 555 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 555, min: 0 },
      items: 2,
      slidesToSlide: 2
    }
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
                  <h3>Top Cast</h3>
                  <Carousel responsive={responsive}>
                    {cast.map((e, index) => (
                      <div key={index}>
                        <Cast img={e.profile_path} character={e.character} name={e.name} />
                      </div>
                    ))}
                  </Carousel>
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
              <iframe width="100%" height="545" src={`https://www.youtube.com/embed/${KeyVideo}`} allowFullScreen title={KeyVideo}></iframe>
              <h3 className="text-white mt-5">Related Videos  </h3>
              <Carousel responsive={responsive}>
                  {video.map((e, index) => (
                    <div key={index}>
                      <img
                        src={`https://img.youtube.com/vi/${e.key}/0.jpg`}
                        alt={`Video Thumbnail ${index}`}
                        style={{ width: '90%', height: 'auto' }}
                        onClick={()=>setKeyVideo(e.key)}
                      />
                    </div>
                  ))}
                </Carousel>
            </div>
          )}


   
            <div className="container pt-5">
              {rew && (<Reviews ></Reviews>)}

              {simili.length > 0 && (
                <div className="container">
                  <h3 className="mt-5">Similar Movies</h3>
                  <Carousel responsive={responsive}>
                    {simili.map((e, index) => (
                      e.poster_path && (
                        <div key={index}>
                          <MyCard film={e} />
                        </div>
                      )
                    ))}
                  </Carousel>
                </div>
              )}

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
