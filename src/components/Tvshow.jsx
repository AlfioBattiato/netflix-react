import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import MyCard from "./MyCard";
import MySpinner from "./MySpinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { getFetch } from "../redux/actions";

const Tvshow = () => {
  const [spinner, setSpinner] = useState(true);

  const airing_today = useSelector(state => state.airing_today);
  const on_the_air = useSelector(state => state.on_the_air);
  const topRated = useSelector(state => state.top_rated_tv);
  const popular = useSelector(state => state.popular_tv);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFetch('tv','on_the_air'));
    dispatch(getFetch('tv','airing_today'));
    dispatch(getFetch('tv','top_rated'));
    dispatch(getFetch('tv','popular'));
    setSpinner(false);

  }, [dispatch]);

  const renderMovies = (movies) => {
    if (!movies) {
      return null;
    } else {
      return movies.map((film, index) => (
        <div key={film.id}>
          <MyCard film={film} />
          <div>
            <p className='text-white my-1'>{film.original_name}</p>
            <div className="d-flex align-items-center pe-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#CF9C0E' className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                         0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <span className="my-1">{film.vote_average.toFixed(1)}</span>
              <span className="badge text-bg-dark ms-auto">{film.first_air_date}</span>
            </div>
          </div>
        </div>
      ));
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 7,
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

  const renderSection = (title, movies) => (
    <>
      <h3 className="pt-5">{title}</h3>
      {spinner && <MySpinner />}
      <Row className="gx-2 gy-2">
        <Carousel responsive={responsive}>{renderMovies(movies)}</Carousel>
      </Row>
    </>
  );

  return (
    <div className="container-fluid">
      {renderSection('Airing today', airing_today)}
      {renderSection('On the air', on_the_air)}
      {renderSection('Top rated', topRated)}
      {renderSection('Popular', popular)}
    </div>
  );
};

export default Tvshow;