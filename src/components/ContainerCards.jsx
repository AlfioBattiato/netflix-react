import React, { Component } from "react";
import { Row } from 'react-bootstrap';
import MyCard from "./MyCard";
import MySpinner from "./MySpinner";
import Slider from "react-slick";

class ContainerCards extends Component {
  state = {
    treding: [],
    popular: [],
    toprated: [],
    allSearch: [],
    spinner: true,
    spinner2: false,
  };

  getFetch = (nome, parametro) => {
    fetch(`https://api.themoviedb.org/3/${nome}?api_key=fe4cdf06ddd3985087ca7bae07a4bddb`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((obj) => {
        this.setState(prevState => ({
          [parametro]: obj.results,
          spinner: parametro === "treding" ? false : prevState.spinner,
          spinner2: parametro === "allSearch" ? false : prevState.spinner2
        }));
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  componentDidMount() {
    this.getFetch("movie/upcoming", "treding");
    this.getFetch("movie/top_rated", "toprated");
    this.getFetch("movie/popular", "popular");
  }

  componentDidUpdate(prevProps) {
    if (this.props.object !== prevProps.object) {
      if (this.props.object === "") {
        this.setState({ spinner2: false, allSearch: [] });
      } else {
        this.setState({ spinner2: true });
        this.getFetch(this.props.object, "allSearch");
      }
    }
  }

  renderSpinner = () => {
    const { spinner2 } = this.state;
    return spinner2 && (
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
    );
  };

  renderMovies = (movies) => {
    const settings = {
      className: "center setting",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 6,
      swipeToSlide: true,
      slidesToScroll: 1,
      autoplay: false,
      speed: 500,
      autoplaySpeed: 6000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 700,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 1000,
          settings: { slidesToShow: 4 }
        }
      ],
    };

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((film) => (
            <MyCard key={film.id} film={film} />
          ))}
        </Slider>
      </div>
    );
  };

  render() {
    const { spinner, treding, toprated, popular } = this.state;

    return (
      <div className="container-xxxl">
        {this.renderSpinner()}

        <h3 className="pt-5">Upcoming Movies</h3>
        <Row className="gx-5 gy-2">
          {spinner && <MySpinner />}
          {this.renderMovies(treding)}
        </Row>

        <h3 className="pt-5">Popular</h3>
        <Row className="gx-5 gy-2">
          {spinner && <MySpinner />}
          {this.renderMovies(popular)}
        </Row>

        <h3 className="pt-5">Top rated</h3>
        <Row className="gx-5 gy-2">
          {spinner && <MySpinner />}
          {this.renderMovies(toprated)}
        </Row>
      </div>
    );
  }
}

export default ContainerCards;
