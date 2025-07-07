import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../contextapi/AuthContext";


const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    <>
      <div>
        <div>
          <Container className="py-2 bg-ligth" style={{ height: "500px" }}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col>
                <Card className="card-registration my-4">
                  <Row className="g-0">
                    {/* Left Image Section */}
                    <Col md={6} className="d-none d-xl-block">
                      <img
                        src="https://cdn.dribbble.com/userupload/31820057/file/original-f00df735e0ae8b12b596efe4e7d1d5f3.png"
                        alt="Sample"
                        className="img-fluid"
                        style={{ height: "620px", width: "700px" }}
                      />
                    </Col>
                    {/* Form Section */}
                    <Col md={6} style={{ height: "620px", width: "700px" }}>
                      <Card.Body className="p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">
                          Registration Form
                        </h3>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="username" className="mb-4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="username"
                              required
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="email" className="mb-4">
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control
                              size="lg"
                              type="email"
                              name="email"
                              required
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="address" className="mb-4">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                              size="lg"
                              type="password"
                              name="password"
                              required
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-end">
                            <Button
                              type="submit"
                              variant="success"
                              size="lg"
                              className="m-2"
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Register;
