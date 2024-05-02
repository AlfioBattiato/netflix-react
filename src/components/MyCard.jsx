import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const MyCard = (props) => {
    const [show, setShow] = useState('d-none scale');
    const [scale, setScale] = useState('');
    const navigate = useNavigate();

    // Funzione per calcolare il colore dei cerchi in base al rating
    const getCircleColor = (rating, index) => {
        const maxCircles = rating / 2;
        if (index < maxCircles) {
            if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
                return "red";
            } else {
                return "red";
            }
        }
        else {
            return "gray";
        }
    };



    return (
        <Col className="col-6 col-md-4 col-lg 2 col-xl-2 position-relative " style={{ height: "20rem", width: "96%" }}
            onMouseEnter={() => { setShow(''); setScale('scale') }}
            onMouseLeave={() => { setShow('d-none'); setScale('') }}>
            {props.film.poster_path ? (<img
                className={`${scale}`}
                src={`https://image.tmdb.org/t/p/original/${props.film.poster_path}`}
                alt="img"
                width="100%"
                style={{ objectFit: "cover", height: "100%" }}

            />) : (
                <p>No pictures</p>
            )}

            <div className={`info p-4 d-flex flex-column justify-content-between ${show} ${scale}`}

            >
                <h6 className='fw-bold py-2 bebas2 '>{props.film.title}</h6>
                <div >
                    <p className='fw-semibold mb-0' style={{ color: "green" }}>imdbVotes: {props.film.vote_average}</p>
                    <p className='fst-italic mb-1'>Rate:{props.film.vote_average.toFixed(1)}</p>
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(props.film.vote_average, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                             0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>

                        ))}
                    </div>

                    <Button className='mt-2 btn-sm ' variant="light" size="lg" onClick={() => {
                         window.scroll(0, 0);
                        navigate(`/Detail/${props.film.id}`);
                    }}>Watch Trailer</Button>


                </div>
            </div>
        </Col>
    );
}

export default MyCard;
