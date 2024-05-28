import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const MyCard = (props) => {
    const [show, setShow] = useState('d-none scale');
    const [scale, setScale] = useState('');
    const navigate = useNavigate();

    // Funzione per calcolare il colore dei cerchi in base al rating
    // const getCircleColor = (rating, index) => {
    //     const maxCircles = rating / 2;
    //     if (index < maxCircles) {
    //         if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
    //             return "#CF9C0E";
    //         } else {
    //             return "#CF9C0E";
    //         }
    //     }
    //     else {
    //         return "gray";
    //     }
    // };

    const handleclick = () => {
        const navbarElement = document.getElementById('navbarScroll');
        const navbarbtn = document.getElementsByClassName('navbar-toggler')[0];
        if (navbarElement.classList.contains('show')) {
            navbarbtn.classList.add('collapsed')
            navbarElement.classList.remove('show');
          } 
        window.scroll(0, 0)
        const { id } = props.film;
        const url = `/Detail/${props.film.original_name ? 'tv/' + id : 'movie/' + id}`;
        navigate(url);

    }


    return (
        <div className="position-relative overflow-hidden  " style={{ height: "20rem", width: "96%" }}
            onMouseEnter={() => { setShow(''); setScale('scale') }}
            onMouseLeave={() => { setShow('d-none'); setScale('') }}>
            {props.film.poster_path ? (
                <img
                    className={` rounded`}
                    src={`https://image.tmdb.org/t/p/original/${props.film.poster_path}.webp`}
                    alt="img"
                    width="100%"
                    style={{ objectFit: "cover", height: "100%" }}
                />) : (
                <p>No pictures</p>
            )}

            <div className={`info p-4 d-flex align-items-center justify-content-center ${show}  rounded`} onClick={() => {
               handleclick()
            }} >
                {/* <div className={`info p-4 d-flex flex-column justify-content-between ${show} ${scale} rounded`} > */}
                {/* <h6 className='fw-bold py-2 bebas2 '>{props.film.title ? props.film.title : props.film.original_name}</h6> */}
                {/* <div > */}
                {/* <p className='fw-semibold mb-0' style={{ color: "green" }}>imdbVotes: {props.film.vote_average}</p>
                    <p className='fst-italic text-white mb-1'>Rate:{props.film.vote_average ? props.film.vote_average.toFixed(1) : ''}</p>
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(props.film.vote_average, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                             0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>

                        ))}
                    </div> */}
                <svg
                    fill="currentColor"
                    height="90px"
                    width="90px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 294.843 294.843"
                    onClick={() => {
                        handleclick()
                    }}
                >
                    <g>
                        <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z" />
                        <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293                    c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029 C113.877,77.926,111.575,77.902,109.699,78.969z" />
                    </g>
                </svg>
                {/* <Button
                        className='mt-2 btn-sm '
                        variant="light"
                        size="lg"
                        onClick={() => {
                            window.scroll(0, 0);
                            const { id } = props.film;
                            const url = `/Detail/${props.film.original_name ? 'tv/' + id : 'movie/' + id}`;
                            navigate(url);
                        }}
                    >
                        Watch Trailer
                    </Button> */}


                {/* </div> */}
            </div>
        </div>
    );
}

export default MyCard;
