import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/actions";

function MyNavbar() {
  const dispatch = useDispatch()
  const [isScrolled, setIsScrolled] = useState(false);
  const [parola, setParola] = useState("");
  const navigate = useNavigate()
  const myList = useSelector(state => state.myList)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [myList]);

  const location = useLocation();


  const handleclick = () => {
    const navbarElement = document.getElementById('navbarScroll');
    const navbarbtn = document.getElementsByClassName('navbar-toggler')[0];
    if (navbarElement.classList.contains('show')) {
      navbarbtn.click(); // Simula un clic sul pulsante per chiudere la navbar
    }
    window.scroll(0, 0)


  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`w-100 dk navbar-scrolled ${isScrolled && "navbar-scrolled dk2"}`}
    >
      <Container fluid>
        <Link
          to={"/"}
          className={`nav-link ${location.pathname === "/" && "active"}`}
          onClick={() => handleclick()}
        >
          <img src="/assets/cine.png" alt="logo" width="200rem" height="auto" class="m-3" />

        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="">
          <Nav className="me-auto my-2 my-lg-0 d-flex" navbarScroll>
            <Link
              to={"/"}
              className={`nav-link ${location.pathname === "/" && "active"}`}
              onClick={() => handleclick()}
            >
              Home
            </Link>
            <Link
              to={"/Tvshow"}
              className={`nav-link ${location.pathname === "/Tvshow" && "active"
                }`}
              onClick={() => handleclick()}
            >
              Tvshow
            </Link>
            <Link
              to={"/MyList"}
              className={` nav-link ${location.pathname === "/MyList" && "active"
                }`}
              onClick={() => handleclick()}
            >
              <div className="position-relative d-inline">
                <span className="z-3">  My List</span>
                {myList.length > 0 && (
                  <span className="position-absolute  translate-middle badge rounded-pill  align-content-center  nfavorite">
                    {myList.length} <span className="visually-hidden">unread messages</span></span>)}
              </div>

            </Link>
          </Nav>

          <Form
            className="d-flex"
            onChange={(e) => {
              setParola(e.target.value);
            }}
            onSubmit={(e) => {
              e.preventDefault()
              dispatch(search(parola))
              navigate("/search")
              handleclick()
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              id="input"
            />
            <Button aria-label="Name" variant="outline-dark border-0" type="submit">
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

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
