import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import {
  Container,
  Card,
  Form,
  Button,
  Spinner
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../css/login.css"
import "../css/navbar.css"
import axios from "axios"
import { AiFillGoogleCircle } from "react-icons/ai"
import { AiFillFacebook } from "react-icons/ai"

export default function Login() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setSubmitting(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setSubmitting(false);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setSubmitting(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitting(false);
        setError(true);
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 3000);
      });

    setValidated(true);
  };

  return (
    <>
      <NavBar />

      <div className="signup-container">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Blog học tập Việt Nam</Card.Title>
              <p className="talk-about"><a href="/">Bolg học tập Việt Nam</a> là cộng đồng trao đổi cho cái thành viên </p>

              <Button className="button-login button-google">
                <AiFillGoogleCircle /> Đăng kí với Google
              </Button>

              <Button className="button-login button-facebook">
                <AiFillFacebook /> Đăng kí với Facebook
              </Button>
              <br />
              <p className="drop-line"> <hr /> Hoặc <hr /> </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide email
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter password
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-left">
                  <Button
                    variant="primary"
                    type="submit"
                    {...(submitting ? { disabled: true } : {})}
                  >
                    {submitting ? (
                      <Spinner as="span" animation="border" role="status" />
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>

                </div>
                <br />

                <p className="drop-line drop-signin"><hr /><spa><a className="drop-link" href="/login"> Quên mật khẩu?</a> or <a className="drop-link" href="/signup">Đăng kí</a></spa><hr /></p>
              </Form>
              <div className="error">{error && <p>{errorMsg}</p>}</div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  )
}

