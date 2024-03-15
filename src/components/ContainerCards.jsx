import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import MyCard from "./MyCard";

class ContainerCards extends Component {
  state = {
    allHarry: [],
    allStar: [],
    allLord: [],
  };

  getFetch = (nome, parametro) => {
    fetch(`https://www.omdbapi.com/?apikey=96932c7f&s=${nome}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((obj) => {
        console.log(obj);
        this.setState({ [parametro]: obj.Search });
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  componentDidMount() {
    this.getFetch("harry", "allHarry");
    this.getFetch("star", "allStar");
    this.getFetch("Lord", "allLord");
  }

  render() {
    return (
      <>
        <div className="container-xxxl">
          <h3 className="pt-5">Treding Now </h3>

          {/* qui ci aspettiamo un array di film */}
          <Row className="gx-1 gy-1">
            {this.state.allHarry.slice(0, 6).map((film) => (
              <MyCard image={film.Poster} key={film.imdbID}></MyCard>
            ))}
          </Row>
          <h3 className="pt-5">Watch it Again</h3>

          {/* qui ci aspettiamo un array di film */}
          <Row className="gx-3 gy-3">
            {this.state.allStar.slice(0, 6).map((film) => (
              <MyCard image={film.Poster} key={film.imdbID}></MyCard>
            ))}
          </Row>
          <h3 className="pt-5">New Releases </h3>

          {/* qui ci aspettiamo un array di film */}
          <Row className="gx-3 gy-3">
            {this.state.allLord.slice(0, 6).map((film) => (
              <MyCard image={film.Poster} key={film.imdbID}></MyCard>
            ))}
          </Row>
        </div>
      </>
    );
  }
}

export default ContainerCards;
