import { Component } from "react";
import Col from 'react-bootstrap/Col';

class MyCard extends Component{

render(){
    return(
        <Col className="col-6 col-md-4 col-lg 2 col-xl-2" style={{height:"15rem"}}>
            <img src={this.props.image} alt="img" width="100%" style={{objectFit:"cover",height:"100%"}}></img>
        </Col>
    )
}

} export default MyCard