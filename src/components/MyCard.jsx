import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const MyCard = (props) => {
    const [singleMovie, setSingleMovie] = useState({});
    const [show, setShow] = useState('d-none scale');
    const [scale, setScale] = useState('');
    const navigate = useNavigate();

    // Effettua la chiamata API per ottenere i dettagli del singolo film
    const getFetch = () => {
        fetch(`http://www.omdbapi.com/?apikey=96932c7f&i=${props.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Problema nella chiamata API");
                }
            })
            .then((data) => {
                setSingleMovie(data);
            })
            .catch((error) => {
                console.log("ERRORE", error);
            });
    };


    useEffect(() => {
        getFetch()
    }, [props.id]);

    // Funzione per calcolare il colore dei cerchi in base al rating
    const getCircleColor = (rating, index) => {
        // Calcoliamo il numero massimo di cerchi da colorare, assumendo che il rating massimo sia 5
        const maxCircles = rating / 2;

        // Se l'indice è inferiore al numero massimo di cerchi, colora il cerchio di verde
        if (index < maxCircles) {
            // Se la parte decimale del rating è 0.5 e l'indice corrisponde all'ultimo cerchio, coloriamo la metà del cerchio di verde
            if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
                return "green";
            } else {
                return "green";
            }
        }
        // Altrimenti, colora il cerchio di grigio
        else {
            return "gray";
        }
    };


    return (
        <Col className="col-6 col-md-4 col-lg 2 col-xl-2 position-relative " style={{ height: "20rem", width: "97%" }} 
         onMouseEnter={() => {setShow('') ;setScale('scale')}}
        onMouseLeave={() => {setShow('d-none');setScale('')}}>
            <img
            className={`${scale}`}
                src={props.image.replace("300", '1920')}
                alt="img"
                width="100%"
                style={{ objectFit: "cover", height: "100%" }}
                onClick={() => { navigate("/Detail/" + props.id) }}
            />
            <div className={`info p-4 d-flex flex-column justify-content-between ${show} ${scale}`}
                            onClick={() => { navigate("/Detail/" + props.id) }}
                            >
                <h6 className='fw-bold py-2 '>{singleMovie.Title}</h6>
                <div>
                    <p className='fw-semibold mb-0' style={{ color: "green" }}>imdbVotes: {singleMovie.imdbVotes}</p>
                    <p className='fst-italic mb-1'>Rate:</p>
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "inline-block",
                                    margin: "0 5px",
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    backgroundColor: getCircleColor(singleMovie.imdbRating, index),
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default MyCard;
