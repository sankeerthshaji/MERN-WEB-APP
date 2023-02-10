import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import useLogout from "../../hooks/user/useLogout";
import Table from "react-bootstrap/Table";

function Body() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      console.log(response.data.users);
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { logout } = useLogout();

  const handleDelete = async (user) => {
    console.log(user._id);
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const response = await axios.delete(`/admin/users/${user._id}`);
      console.log(response);
      fetchUsers();
      logout();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (user) => {
    navigate(`/admin/editUser?userId=${user._id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    let searchedUsers = [];
    if (e.target.value !== "") {
      searchedUsers = users.filter((user) =>
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
    } else {
      searchedUsers = users;
    }
    setFilteredUsers(searchedUsers);
  };

  return (
    <div className="Home">
      <Container className="d-flex flex-column" style={{ marginTop: "50px" }}>
        <form className="d-flex" style={{ position: "absolute", top: "8rem" }}>
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "7px",
              fontSize: "14px",
            }}
          />
        </form>
        <Button
          className="me-0 ms-auto"
          variant="outline-dark"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            navigate("/admin/addUser");
          }}
        >
          Add User
        </Button>
        <Table striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th className="text-center">Sl.No</th>
              <th className="text-center">Email</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          {(filteredUsers.length === 0 && searchTerm !== "") || users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  No Users Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {searchTerm === "" &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

              {searchTerm !== "" &&
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </Table>
      </Container>
    </div>
  );
}

export default Body;
