function Cast(props) {

    return (
        <div className="position-relative d-flex justify-content-center ">
            <img
                src={props.img ? `https://image.tmdb.org/t/p/original/${props.img}` : "/assets/avatar.jpg"}
                alt="img"
                width={"90%"}
                height={"100%"}

            />
            <div className=" dk position-absolute " style={{width:"90%" ,height:"40%"}}>

                <p> {props.name}</p>
                <p className="text-danger"  >{props.character}</p>
                
            </div>
        </div>
    )
}
export default Cast;