import { useState } from "react";

function Cast(props) {
    const [show, setShow] = useState('d-none');


    return (
        <div className="position-relative d-flex justify-content-center " onMouseEnter={() => { setShow('') }}
            onMouseLeave={() => { setShow('d-none') }}>
            <img
                src={props.img ? `https://image.tmdb.org/t/p/original/${props.img}` : "/assets/avatar.jpg"}
                alt="img"
                width={"90%"}
                height={"100%"}

            />
            <div className={` dk  castAnimation  ${show}`} style={{ width: "90%", height: "55%" }}
            >
                <span className="">Actor:</span>
                <p> {props.name}</p>
                <span>Role:</span>
                <p className="text-danger "  >{props.character}</p>

            </div>
        </div>
    )
}
export default Cast;