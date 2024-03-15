import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="dk" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>
          <img src="assets/netflix_logo.png" alt="logo" width={"120rem"}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">TvShow</Nav.Link>
            <Nav.Link href="#">Movies</Nav.Link>
            <Nav.Link href="#">Recently Added</Nav.Link>
            <Nav.Link href="#">My List</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="input"
            />
            <Button variant="outline-dark">
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
          <Button variant="" className="border-none">
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
          <Nav.Link href="#" className="ps-lg-3 fw-bold text-white">
            <img src="assets/avatar.png" width="37rem" alt="" />
          </Nav.Link>
          {/*--------------------------------------------------------------- freccia dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-basic" >
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/">Profile</Dropdown.Item>
              <Dropdown.Item href="#/">My list </Dropdown.Item>
              <Dropdown.Item href="#/">Setting</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
