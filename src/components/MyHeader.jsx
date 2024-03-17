import React, {  Component } from "react";

class MyHeader extends Component {
  state = {
    ricerca: [],
  };

  getFetch = (nome) => {
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

        this.setState({ ricerca: obj.Search });
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  componentDidMount() {
    this.getFetch("i am legend");
  }

  render() {
    return (
      <>
          {this.state.ricerca.length > 0 && (
          <div
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            backgroundSize: "cover",
            height:"55vh",
            backgroundPosition: "center",
          }}
        >
            </div>
          )}
      </>
    );
  }
}

export default MyHeader;
