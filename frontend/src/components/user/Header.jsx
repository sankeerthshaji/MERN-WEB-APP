import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/user/useLogout";
import { useSelector } from "react-redux";
import profileIcon from "../../assets/images/profileIcon.svg";

function Header() {
  const navigate = useNavigate();
  //to store current state of user
  const user = useSelector((state) => state.user);

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <Navbar
      style={{ backgroundColor: "black", padding: "10px", height: "75px" }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img
              src={require("../../assets/images/travelTales.png")}
              alt="TravelTales logo"
              height={60}
            />
            <span style={{ marginLeft: "10px" }}>TravelTales</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          style={{ marginRight: "3rem" }}
          className="justify-content-end"
        >
          {user && (
            <>
              <Navbar.Text style={{ color: "white" }}>
                Signed in as:{" "}
                <Link to="/" style={{ color: "white" }}>
                  {user.email}
                </Link>
              </Navbar.Text>
              <img
                src={profileIcon}
                onClick={() => navigate("/profile")}
                alt="User profile"
                style={{ marginLeft: "20px" , cursor: "pointer" }}
              />
            </>
          )}
        </Navbar.Collapse>

        {user && (
          <Button onClick={handleLogout} variant="outline-light">
            Logout
          </Button>
        )}

        {!user && (
          <Button variant="outline-light">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
              onMouseEnter={() => {
                this.style.color = "black";
              }}
              onMouseLeave={() => {
                this.style.color = "inherit";
              }}
            >
              Login
            </Link>
          </Button>
        )}

        {!user && (
          <Button variant="outline-light">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
              onMouseEnter={() => {
                this.style.color = "black";
              }}
              onMouseLeave={() => {
                this.style.color = "inherit";
              }}
            >
              Signup
            </Link>
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
