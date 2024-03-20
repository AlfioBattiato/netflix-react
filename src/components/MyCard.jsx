import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

function MyCard (props){
    const navigate=useNavigate()




    return(
        <Col className="col-6 col-md-4 col-lg 2 col-xl-2" style={{height:"15rem"}}>
            <img src={props.image} alt="img" width="100%" style={{objectFit:"cover",height:"100%"}}
            onClick={()=>{navigate("/Detail/"+props.id)}}/>
            
        </Col>
    )


} export default MyCard