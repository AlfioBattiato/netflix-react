import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import MyCard from "./MyCard";
import MySpinner from "./MySpinner";
import Slider from "react-slick";
import { useDispatch, useSelector } from 'react-redux';
import { getFetch } from "../redux/actions";

const ContainerCards = () => {
  const [spinner, setSpinner] = useState(true);

  const nowPlaying = useSelector(state => state.nowplaying);
  const upcoming = useSelector(state => state.upcoming);
  const topRated = useSelector(state => state.toprated);
  const popular = useSelector(state => state.popular);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFetch('now_playing'));
    dispatch(getFetch('upcoming'));
    dispatch(getFetch('top_rated'));
    dispatch(getFetch('popular'));
    setSpinner(false);

  }, []);



  const renderMovies = (movies) => {
    if (!movies || movies.length === 0) {
      return null;
    } else {

      const settings = {
        className: "center setting",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 7,
        swipeToSlide: true,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 6000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 500,
            settings: { slidesToShow: 2 }
          },
          {
            breakpoint: 700,
            settings: { slidesToShow: 3 }
          },
          {
            breakpoint: 1200,
            settings: { slidesToShow: 4 }
          }
        ],
      };

      return (

        <div className="slider-container">
          <Slider {...settings}>
            {movies.map((film, index) => (
              <div key={film.id} >
                <MyCard film={film} />
                <div>
                  <p className='text-white  my-1'>{film.title}</p>
                  <div className="d-flex align-items-center pe-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#CF9C0E' className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                               0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <span>{film.vote_average.toFixed(1)}</span>
                    <span className="badge text-bg-dark ms-auto">{film.release_date}</span>
                  </div>
                </div>
              </div>

            ))}
          </Slider>

        </div>
      );
    }
  };

  return (
    <div className="container-xxxl">
    

      <h3 className="pt-5">Upcoming Movies</h3>
      {spinner && <MySpinner />}
      <Row className="gx-2 gy-2">
        {renderMovies(upcoming)}
      </Row>

      <h3 className="pt-5">Popular</h3>
      {spinner && <MySpinner />}
      <Row className="gx-2 gy-2">
        {renderMovies(popular)}
      </Row>

      <h3 className="pt-5">Top rated</h3>
      {spinner && <MySpinner />}
      <Row className="gx-2 gy-2">
        {renderMovies(topRated)}
      </Row>
      <h3 className="pt-5">Now Playing</h3>
      {spinner && <MySpinner />}
      <Row className="gx-2 gy-2">
        {renderMovies(nowPlaying)}
      </Row>
    </div>
  );
};

export default ContainerCards;

