import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postReviews } from "../redux/actions";
import { useParams } from "react-router-dom";

function Reviews() {
    const reviews = useSelector(state => state.reviews)
    const dispatch = useDispatch()
    const params = useParams();

    const [number, setNumber] = useState(4)
    const [number2, setNumber2] = useState(0)
    const [sendRate, setSendRate] = useState(false)



    const [readmores, setReadmores] = useState(reviews.map(() => 400));
    const handleReadmoreClick = (index) => {
        const newReadmores = [...readmores];
        newReadmores[index] += 2000;
        setReadmores(newReadmores);
    };


    const user = "Guess"
    const [commento, setCommento] = useState({
        value: 1,

    })

    const getCircleColor = (rating, index) => {
        const maxCircles = rating;
        if (index < maxCircles) {
            if (index === Math.floor(maxCircles) && rating % 2 === 0.5) {
                return "#CF9C0E";
            } else {
                return "#CF9C0E";
            }
        }
        else {
            return "gray";
        }
    };



    return (<>
        <div className="container mt-3">
            <h3>Reviews</h3>
            <div className="row">
                <div className="col-12 col-md-9">
                    {reviews && reviews.length > 0 ? (
                        <>

                            {reviews.slice(0, number).map((e, index) => (
                                <div key={e.id}>
                                    <div className="mt-3 d-flex align-items-center gap-2">
                                        <img src={e.author_details.avatar_path ? `https://image.tmdb.org/t/p/original/${e.author_details.avatar_path} ` : "/assets/avatar.jpg"} style={{ width: "3rem", objectFit: "cover", height: "3rem", borderRadius: "50%" }} alt="avatar" />
                                        <p className="m-0">{e.author}</p>
                                    </div>
                                    <div className="d-flex mt-2">
                                        <span className="me-3">Rate: {e.author_details.rating}</span>
                                        {[...Array(10)].map((_, index) => (
                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(e.author_details.rating, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                             0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="rounded border mt-2 p-3">
                                        <p dangerouslySetInnerHTML={{ __html: e.content.slice(0, readmores[index]) }}></p>
                                        {e.content.length > readmores[index] ? (<span className="text-primary" style={{ cursor: "pointer" }} onClick={() => handleReadmoreClick(index)}>Read more...</span>) : ""}
                                    </div>
                                </div>

                            ))}
                            {reviews.length > 4 && (
                                <Button variant="outline-light" className="mt-2 w-100" onClick={() => setNumber(number + 4)}> <i className="bi bi-chevron-compact-down"></i></Button>

                            )}
                        </>
                    ) : (<p> 0 Reviews</p>)}
                </div>
                <div className="col-12 col-md-3">
                    <h5 className="text-primary mt-2">Rate Movie</h5>
                    <p>User: {user}</p>
                    <p>Rate: {number2}</p>
                    {[...Array(10)].map((e, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={getCircleColor(number2, index)} className="bi bi-star-fill me-1" viewBox="0 0 16 16"
                            onClick={() => {
                                const btn = document.getElementById("submitform")
                                if (btn.disabled === false) {
                                    setNumber2(index + 1)
                                    setCommento({
                                        ...commento,
                                        value: index + 1
                                    })

                                }

                            }}>
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                             0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    ))}
                    <form

                        onSubmit={(e) => {
                            const btn = document.getElementById("submitform");
                            e.preventDefault();
                            btn.disabled = true;
                            dispatch(postReviews(params.filmId, commento));
                            console.log(commento);
                            setSendRate(true)

                        }}
                    >
                        <div className="position-relative" style={{ width: "100%", height: "40px" }}>
                            {sendRate &&
                                (
                                    <p className="text-success" id="pRating">Rating sent successfully</p>
                                )
                            }
                        </div>
                        <Button variant="outline-success" type="submit" id="submitform" className="mt-2">
                            Submit
                        </Button>
                    </form>


                </div>
            </div>
        </div>

    </>)
}
export default Reviews;