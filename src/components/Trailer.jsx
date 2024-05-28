import React, {  useEffect,  } from "react";


function Trailer(props) {

  useEffect(() => {
   
  }, [props]);



  return (
    <>

    
      <a className="btn btn-sm btn-outline-light dropdown-toggle mb-2 " href="#1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Other Videos
      </a>

      <ul className="dropdown-menu p-0 my-1" style={{maxHeight:"19rem",overflow:"scroll"}}>
        <div className="dropdown  ">
          {props.video.map((film,index ) => (

            <li key={index} className="dk3 p-1 otherVideos" onClick={()=>props.funzione(film.key)}>{film.name}</li>

          ))}
        </div>
      </ul>

    </>
  );
}

export default Trailer;
