import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const ErrorAlert = ({ error }) => {
  return (
    <Alert variant="danger" className="mt-3">
      {error}
    </Alert>
  );
};

function EditUser() {
  const admin = useSelector((state) => state.admin);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  console.log(userId);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        console.log(response.data.user.email);
        setEmail(response.data.user.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(`/admin/users/${userId}`, {
        email,
      });
      console.log(response);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), email })
      );
      navigate("/admin");
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    EDIT USER
                  </h2>
                  {error && <ErrorAlert error={error} />}
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditUser;
