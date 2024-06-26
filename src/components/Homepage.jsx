import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import MyCard from "./MyCard";
import MySpinner from "./MySpinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { getFetch } from "../redux/actions";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  const nowPlaying = useSelector(state => state.nowplaying);
  const upcoming = useSelector(state => state.upcoming);
  const topRated = useSelector(state => state.toprated);
  const popular = useSelector(state => state.popular);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(getFetch('movie', 'now_playing')),
        dispatch(getFetch('movie', 'upcoming')),
        dispatch(getFetch('movie', 'top_rated')),
        dispatch(getFetch('movie', 'popular')),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const renderMovies = (movies) => {
    if (!movies) {
      return null;
    } else {
      return movies.map((film, index) => (
        <div key={film.id}>
          <MyCard film={film} />
          <div>
            <p className='text-white my-1'>{film.title}</p>
            <div className="d-flex align-items-center pe-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#CF9C0E' className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                         0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <span className="my-1">{film.vote_average.toFixed(1)}</span>
              <span className="badge text-bg-dark ms-auto">{film.release_date}</span>
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
      slidesToSlide: 1
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


      <Row className="gx-2 gy-2">
        <Carousel responsive={responsive} autoPlay autoPlaySpeed={10000} infinite>
          {renderMovies(movies)}
        </Carousel>
      </Row>

    </>
  );

  return (
    <div className="container-fluid">
      {loading ? (
        <MySpinner />
      ) : (
        <>
          {renderSection('Upcoming Movies', upcoming)}
          {renderSection('Popular', popular)}
          {renderSection('Top rated', topRated)}
          {renderSection('Now Playing', nowPlaying)}
        </>
      )}


    </div>
  );
};

export default Homepage;
