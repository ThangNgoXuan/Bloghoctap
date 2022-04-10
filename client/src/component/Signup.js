import React, {useState, useEffect} from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { 
    Container,
    Card,
    Form,
    Button,
    Spinner
} from "react-bootstrap"
import "../css/login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {AiFillGoogleCircle} from "react-icons/ai"
import {AiFillFacebook} from "react-icons/ai"


export default function Signup() {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
        navigate("/");
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        setSubmitting(true);
        event.preventDefault();
        if (form.checkValidity() === false) {
        event.stopPropagation();
        return;
        }

        if (password !== confirmPassword) {
        setError(true);
        setErrorMsg("Passwords do not match");
        setTimeout(() => {
            setError(false);
            setErrorMsg("");
        }, 3000);
        setSubmitting(false);
        event.stopPropagation();
        return;
        }

        axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
            name,
            email,
            password,
        })
        .then((res) => {
            setSubmitting(false);
            navigate("/login");
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
                           <AiFillGoogleCircle/> Đăng nhập với Google
                    </Button>
                    
                    <Button className="button-login button-facebook">                        
                           <AiFillFacebook/> Đăng nhập với Facebook
                    </Button>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide name
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide email
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter password
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please confirm password
                        </Form.Control.Feedback>
                        </Form.Group>
                       
                        <Button
                            variant="primary"
                            type="submit"
                            {...(submitting ? { disabled: true } : {})}
                        >
                            {submitting ? (
                            <Spinner as="span" animation="border" role="status" />
                            ) : (
                            "Submit"
                            )}
                        </Button>
                  
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

