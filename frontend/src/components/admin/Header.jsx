import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/admin/useLogout";
import { useSelector } from "react-redux";

function Header() {
  //to store current state of user
  const admin = useSelector((state) => state.admin);

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <Navbar
      style={{
        backgroundColor: "black",
        padding: "10px",
        height: "75px",
        position: "relative",
        zIndex: "2",
      }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
            <span style={{ marginLeft: "10px" }}>Admin Panel</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          style={{ marginRight: "3rem" }}
          className="justify-content-end"
        >
          {admin && (
            <>
              <Navbar.Text style={{ color: "white" }}>
                Signed in as:{" "}
                <Link to="/admin" style={{ color: "white" }}>
                  {admin.email}
                </Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>

        {admin && (
          <Button onClick={handleLogout} variant="outline-light">
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
