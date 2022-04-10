import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import avatar from "../image/avatar.jpg"
import "../css/navbar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/user/data`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Blog Học Tập
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            {/* Search Bar */}
            <Nav className="me-auto">
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  handleSearch(e);
                }}
              >
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <Button type="submit" variant="success">
                  <FaSearch />
                </Button>
              </Form>
            </Nav>

             {loggedIn ? ( 
              <Nav>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="new-post"
                    onClick={() => {
                      navigate("/new");
                    }}
                  >
                    Tạo chủ đề
                  </Button>
                </Nav.Link>
                
                <Nav.Link className="noti">
                    <BsBell/>
                </Nav.Link>

                <NavDropdown
                  align={{ lg: "end" }}
                  title={
                      <div className="user-icon">
                        <image src={avatar} />
                      </div>
                  } 
                > 
                  <NavDropdown.Item>Thang Ngo</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              </Nav>
             ) : ( 
               <Nav>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="login"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="signup"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </Nav.Link>
              </Nav> 
             )} 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
