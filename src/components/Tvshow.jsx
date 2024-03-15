import Button from 'react-bootstrap/Button';


function Tvshow() {
  return (
    <div className="container-xxxl">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-4 align-items-center">
          <h2>Tv Shows</h2>
          <div className=" ">
            <select className="p-1 bg-black text-white">
              <option value="0">Genres</option>
              <option value="1">Horror</option>
              <option value="2">War</option>
              <option value="3">Kids</option>
              <option value="4">Romantic</option>
              <option value="5">Fantasy</option>
            </select>
          </div>
        </div>

        <div className="d-flex align-items-center">
        
          <Button variant="outline-light" style={{borderRadius:"0"}} >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>

          </Button>
          <Button variant="outline-light"  className=" border-start-0" style={{borderRadius:"0"}}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>

          </Button>
    
        </div>
      </div>
    </div>
  );
}
export default Tvshow;
