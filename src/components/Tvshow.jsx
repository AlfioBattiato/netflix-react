import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import MyCard from "./MyCard";

function Tvshow() {
  const [lista, setLista] = useState([]);

  const getFetch = () => {
    fetch(`https://www.omdbapi.com/?apikey=96932c7f&s=series`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((data) => {
        setLista(data.Search);
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  return (
    <>
      <div className="container-xxxl">
        <h3 className="pt-5">Tv show:</h3>
        <Row className="gx-3 gy-2">
          {lista.map((film) => (
            <MyCard image={film.Poster} key={film.imdbID} id={film.imdbID} />
          ))}
        </Row>
      </div>
    </>
  );
}

export default Tvshow;
