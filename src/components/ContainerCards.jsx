import { Component } from "react";
import Row from "react-bootstrap/Row";
import MyCard from "./MyCard";

class ContainerCards extends Component {


  state = {
    comment: [],
  };

  getFetch = () => {
    fetch(
      "https://www.omdbapi.com/?apikey=96932c7f&s=harry%20potter",
      {
        headers: {
         "Content-Type": "application/json",
      }}
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema nella chiamata API");
        }
      })
      .then((obj) => {
        console.log(obj)
        // this.setState({ comment: obj });
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };
  componentDidMount() {
    console.log("ok")
    this.getFetch();
  }







  render() {
    return (
      <>
        <h3 className="pt-5">film </h3>

        {/* qui ci aspettiamo un array di film */}
        <Row className="gx-1 gy-1">
            {/* <MyCard img={this.props.img}></MyCard> */}
        </Row>
      </>
    );
  }
}
export default ContainerCards;
