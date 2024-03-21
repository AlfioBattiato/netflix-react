import Button from "react-bootstrap/Button";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";



function MyHeader() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigate=useNavigate()

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="text-white"
      >
        <Carousel.Item>
          <div
            className="multiple"
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg)",

              backgroundSize: "cover",
              height: "70vh",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <Carousel.Caption>
            <div>
              <div className="d-flex  flex-row align-items-center">
                <h1 className="display-1 text-start text-light">One Piece</h1>
                <Button variant="light" size="lg" className="ms-4" onClick={()=>{navigate("/Detail/tt0388629")}}>
                  Info
                </Button>
              </div>

              <h4 className=" display-6 text-start text-light">
                Monkey D. Luffy sets off on an adventure with his pirate crew in
                hopes of finding the greatest treasure ever, known as the "One
                Piece."
              </h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="multiple"
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/87IVlclAfWL6mdicU1DDuxdwXwe.jpg)",

              backgroundSize: "cover",
              height: "70vh",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <Carousel.Caption>
            <div>
              <div className="d-flex  flex-row align-items-center">
                <h1 className="display-1 text-start text-light">
                  Dune: Part Two
                </h1>
                <Button variant="light" size="lg" className="ms-4"onClick={()=>{navigate("/Detail/tt15239678")}}>
                  Info
                </Button>
              </div>

              <h4 className=" display-6 text-start text-light">
                A noble family becomes embroiled in a war for control over the
                galaxy's most valuable asset while its heir becomes troubled by
                visions of a dark future.
              </h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="multiple"
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg)",

              backgroundSize: "cover",
              height: "70vh",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>{" "}
          <Carousel.Caption>
            <div>
              <div className="d-flex  flex-row align-items-center">
                <h1 className="display-1 text-start text-light">The Marvels</h1>
                <Button variant="light" size="lg" className="ms-4" onClick={()=>{navigate("/Detail/tt10676048")}}>
                  Info
                </Button>
              </div>

              <h4 className=" display-6 text-start text-light">
                Carol Danvers gets her powers entangled with those of Kamala
                Khan and Monica Rambeau, forcing them to work together to save
                the universe.
              </h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="multiple"
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg)",

              backgroundSize: "cover",
              height: "70vh",
              width: "100%",
              backgroundPositionY: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <Carousel.Caption>
            <div>
              <div className="d-flex  flex-row align-items-center">
                <h1 className="display-1 text-start text-light">Oppenheimer</h1>
                <Button variant="light" size="lg" className="ms-4" onClick={()=>{navigate("/Detail/tt15398776")}}>
                  Info
                </Button>
              </div>

              <h4 className=" display-6 text-start text-light">
                The story of American scientist J. Robert Oppenheimer and his
                role in the development of the atomic bomb.
              </h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container-xxxl pt-5">
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
            <Button variant="outline-light" style={{ borderRadius: "0" }}>
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
            <Button
              variant="outline-light"
              className=" border-start-0"
              style={{ borderRadius: "0" }}
            >
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
    </>
  );
}

export default MyHeader;
