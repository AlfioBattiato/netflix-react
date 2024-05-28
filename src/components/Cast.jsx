import { useState } from "react";

function Cast(props) {
    const [show, setShow] = useState('d-none');


    return (
        <>
            <p className="mb-1"> {props.name}</p>
            <div onMouseEnter={() => { setShow('') }}
                onMouseLeave={() => { setShow('d-none') }}>
                <img
                    src={props.img ? `https://image.tmdb.org/t/p/original/${props.img}.webp` : "/assets/Missing_photo.svg"}
                    alt="img"
                    width={"90%"}
                    height={"100%"}

                />
                <div className={` dk3 pb-4 px-1 m-0 castAnimation  ${show}`} style={{ width: "90%", height: "auto" }}>

                    <span>Role:</span>
                    <p className="text-blue fw-bold "  >{props.character}</p>

                </div>
            </div>
        </>
    )
}
export default Cast;