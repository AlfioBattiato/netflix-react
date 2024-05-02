
import { useSelector } from 'react-redux';
import MyCard from './MyCard';

function RisultatoRicerca() {
    const ricerca = useSelector(state => state.search);




    return (
        <>
            {ricerca && ricerca.length > 0 ? (
                <div className="container mt-5 py-5">
                    <div className="row gy-4">
                        <h3>Result</h3>
                        {ricerca.map((film, index) =>
                            film.poster_path &&
                            (<div className="col-6 col-md-4 col-lg-3" key={index}>
                                <MyCard film={film} />
                                <div>
                                    <p className='text-white  my-1'>{film.title}</p>
                                    <div className="d-flex align-items-center pe-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#CF9C0E' className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                          0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        <span>{film.vote_average.toFixed(1)}</span>
                                        <span className="badge text-bg-dark ms-auto">{film.release_date}</span>
                                    </div>
                                </div>
                            </div>)

                        )}
                    </div>
                </div>
            ) : (
                <div className="container mt-5 py-5">
                    <h3 >No Results Found</h3>
                    <p>We're sorry, but your search didn't yield any results. Try refining your search terms or exploring other options. If you're looking for something specific, consider adjusting your query to find the content you're seeking. Thank you for your patience and understanding.</p>
                </div>
            )}
        </>
    );
}

export default RisultatoRicerca;

