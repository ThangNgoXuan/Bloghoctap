import React, { useState, useEffect } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import {
    Container,
    Card,
    Form,
    Button,
    Spinner
} from "react-bootstrap"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../css/createpost.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Editpost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /*     useEffect(() => {
            if (!localStorage.getItem("token")) {
              navigate("/login");
            }
          }, [navigate]); */

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const sanitizeContent = content.trim();
        if (sanitizeContent.length < 200) {
            setError(true);
            setErrorMessage("Content must be at least 200 characters long");
            setSubmitting(false);
            setTimeout(() => {
                setError(false);
                setErrorMessage("");
            }, 3000);
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", sanitizeContent);
        formData.append("image", imageData);
        formData.append("date", new Date());
        formData.append("token", localStorage.getItem("token"));
        axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/api/user/create`,
            data: formData,
        })
            .then((res) => {
                setSubmitting(false);
                navigate("/");
            })
            .catch((err) => {
                setSubmitting(false);
                setError(true);
                setErrorMessage(err.response.data.error);
                navigate("/login");
            });
    };
    return (
        <>
            <NavBar />

            <div className="createpost-container">
                <Container>
                    <Card>
                        <Card.Body>
                            <h1 className="heading">Edit Post</h1>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Add a cover image
                                        <Form.Control
                                            type="File"
                                            accept="image/*"
                                            value={imageName}
                                            onChange={(e) => {
                                                setImage(URL.createObjectURL(e.target.files[0]));
                                                setImageData(e.target.files[0]);
                                                setImageName(e.target.value);
                                            }}
                                            name="image"
                                        />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    {image && (
                                        <img className="img-preview" src={image} alt="preview" />
                                    )}
                                    {image && (
                                        <Button
                                            variant="primary"
                                            className="remove-image"
                                            onClick={() => {
                                                setImage(null);
                                                setImage(null);
                                                setImageName("");
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="New post title here ..."
                                    />
                                    <input
                                        type="text"
                                        placeholder="Add 4 Tag Name"
                                        className="addtagname"
                                    />
                                </Form.Group>
                                <CKEditor
                                    editor={ClassicEditor}
                                />
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="mt-3 submit"
                                >
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            <Footer />
        </>
    )
}


