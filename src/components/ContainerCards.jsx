import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import MyCard from "./MyCard";
import MySpinner from "./MySpinner";

class ContainerCards extends Component {
  state = {
    allHarry: [],
    allLove: [],
    allLord: [],
    allSearch: [],
    spinner: true,
    spinner2: false,
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
        this.setState({ [parametro]: obj.Search });
        this.setState({ spinner: false });
        // creo questa condizione per nascondere il  caricamento del loader se non ci sono risultati della ricerca
        if (obj.Search && obj.Search.length > 0) {
          this.setState({ spinner2: false });
        }
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  componentDidMount() {
    this.getFetch("harry", "allHarry");
    this.getFetch("love", "allLove");
    this.getFetch("Lord", "allLord");
  }

  componentDidUpdate(prevProps) {
    // verifico  se ci sono cambiamenti nella props
    if (this.props.object !== prevProps.object) {
      if (this.props.object === "") {
        // questo controllo lo faccio se il campo di ricerca è vuoto
        this.setState({ spinner2: false, allSearch: [] });
      } else {
        // altrimenti richiamo la funzione per cercare il film e nel frattempo avvio il mio spinner
        this.setState({ spinner2: true });
        this.getFetch(this.props.object, "allSearch");
      }
    }
  }

  render() {
    // creo questi parametri per non richiamarmi  più volte i dati con this.state
    const { spinner, allHarry, allLove, allLord, allSearch, spinner2 } =
      this.state;
  

    return (
      <div className="container-xxxl">
        {/* Campo di ricerca */}
        {spinner2 && (
          
          <div>

            <h3 className="pt-5">Sto cercando:</h3>
            <p>
              <i>
                "Stiamo cercando il film che hai inserito. Ti preghiamo di
                attendere mentre analizziamo il nostro vasto database. Ti
                invitiamo a scrivere il nome del film in modo più accurato
                possibile per ottenere risultati più precisi. Grazie per la tua
                collaborazione e pazienza!"
              </i>
            </p>
            <Row className="gx-1 gy-1">
              <MySpinner />
            </Row>
          </div>
        )}

        {/* Risultati ricerca */}
        {allSearch && allSearch.length > 0 && (
          <div>
            <Row className="gx-3 gy-2">
              <h3 className="pt-5">Risultati ricerca:</h3>
              {allSearch.slice(0, 6).map((film) => (
                <MyCard image={film.Poster} key={film.imdbID} id={film.imdbID} />
              ))}
            </Row>
          </div>
        )}

        {/* Trending Now */}
        <h3 className="pt-5">Trending Now</h3>
        <Row className="gx-3 gy-2">
          {spinner && <MySpinner />}
          {allHarry.slice(0, 6).map((film) => (
            <MyCard image={film.Poster} key={film.imdbID} id={film.imdbID} />
          ))}
        </Row>

        {/* Watch it Again */}
        <h3 className="pt-5">Watch it Again</h3>
        <Row className="gx-3 gy-2">
          {spinner && <MySpinner />}
          {allLove.slice(0, 6).map((film) => (
            <MyCard image={film.Poster} key={film.imdbID} id={film.imdbID} />
          ))}
        </Row>

        {/* New Releases */}
        <h3 className="pt-5">New Releases</h3>
        <Row className="gx-3 gy-2">
          {spinner && <MySpinner />}
          {allLord.slice(0, 6).map((film) => (
            <MyCard image={film.Poster} key={film.imdbID} id={film.imdbID}  />
          ))}
        </Row>
      </div>
    );
  }
}

export default ContainerCards;
