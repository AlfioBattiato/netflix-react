import { useState } from "react";

function Cast(props) {
    // const [show, setShow] = useState('d-none');


    return (
        <div className="">
            <p className="mb-1 "> {props.name}</p>
            <img
                src={props.img ? `https://image.tmdb.org/t/p/original/${props.img}.webp` : "/assets/avatar.jpg"}
                alt="img"
                width={"90%"}
                height={"100%"}

            />
            <div className={`m-0 p-1 castAnimation`} style={{ width: "90%", height: "25%" }}>
           
                <span>Role:</span>
                <p className="text-blue fw-bold ">{props.character}</p>

            </div>
        </div>
    )
}
export default Cast;