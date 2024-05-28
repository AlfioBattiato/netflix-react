
import { useDispatch, useSelector } from 'react-redux';
import MyCard from './MyCard';
import { removeFromList } from '../redux/actions';

function MyList() {
    const myList = useSelector(state => state.myList);

    const dispatch = useDispatch()


    return (
        <>
            {myList && myList.length > 0 ? (
                <div className="container my-5 py-5">
                    <div className="row gy-4">
                        <h3>My List</h3>
                        {myList.map((film, index) => <div className="col-6 col-md-4 col-lg-3" key={index}>
                            <div className='d-flex justify-content-between flex-wrap mt-1'>
                                {film.title ? (<p className='text-primary'>MOVIE</p>) : (<p className='text-primary'>TVSHOW</p>)}
                                <p className='btn btn-sm btn-small btn-outline-danger me-2' onClick={() => dispatch(removeFromList(film.id))}>Delete</p>
                            </div>
                            <MyCard film={film} />

                            <div>
                                <p className='text-white  my-1'>{film.title ? film.title : film.name}</p>

                                <div className="d-flex flex-wrap align-items-center pe-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#CF9C0E' className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                          0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <span>{film.vote_average ? film.vote_average.toFixed(1) : ""}</span>
                                    <span className="badge text-bg-dark ms-auto">{film.release_date ? film.release_date : film.first_air_date}</span>

                                </div>

                            </div>
                        </div>

                        )}
                    </div>
                </div>
            ) : (
                <div className="container  my-5 py-5">
                    <h3 >You have no favorites in the list</h3>
                </div>
            )}
        </>
    );
}

export default MyList;

