import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { search } from "../redux/actions";

function MyNavbar() {
  const dispatch=useDispatch()
  const [isScrolled, setIsScrolled] = useState(false);
  const [parola, setParola] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`w-100 dk navbar-scrolled ${isScrolled && "navbar-scrolled dk2"}`}
    >
      <Container fluid>
        <img src="/assets/netflix_logo.png" alt="logo" width="120rem" />

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link
              to={"/"}
              className={`nav-link ${location.pathname === "/" && "active"}`}
              onClick={()=> window.scroll(0, 0)}
            >
              Home
            </Link>
            <Link
              to={"/Tvshow"}
              className={`nav-link ${
                location.pathname === "/Tvshow" && "active"
              }`}
              onClick={()=> window.scroll(0, 0)}
            >
              Tvshow
            </Link>
            <Nav.Link href="#">My List</Nav.Link>
          </Nav>
          <Form
            className="d-flex"
            onChange={(e) => {
              setParola(e.target.value);
            }}
            onSubmit={(e)=>{
              e.preventDefault()
              dispatch(search(parola))
              navigate("/search")
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              id="input"
            />
            <Button variant="outline-dark border-0" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-search fw-bold"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Button>
          </Form>
          {/* campana------------------------------------------------------------- */}
          <div className="d-flex align-items-center pt-3 pt-lg-0">
            <Button variant="" className="border-none ms-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                className="bi bi-bell-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
            </Button>
            {/* --------------------------------------------------------------avatar */}
            <Nav.Link href="#" className="fw-bold text-white">
              KIDS
            </Nav.Link>
            <Nav.Link href="#" className="ps-3  fw-bold text-white">
              <img src="/assets/avatar.png" width="37rem" alt="" />
            </Nav.Link>
            {/*--------------------------------------------------------------- freccia dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>
              <Dropdown.Menu className="dk">
                <Dropdown.Item href="#/">Profile</Dropdown.Item>
                <Dropdown.Item href="#/">My list </Dropdown.Item>
                <Dropdown.Item href="#/">Setting</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
