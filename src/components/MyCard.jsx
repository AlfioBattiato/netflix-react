import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const MyCard = (props) => {
    const [show, setShow] = useState('d-none scale');
    const navigate = useNavigate();



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
            onMouseEnter={() => { setShow('')  }}
            onMouseLeave={() => { setShow('d-none')}}>
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
              
            </div>
        </div>
    );
}

export default MyCard;
