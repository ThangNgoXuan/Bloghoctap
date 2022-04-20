import React, { useState, useEffect } from "react"
import "../css/blog.css"
import {
    Container,
    Row,
    Col,
    Button

} from "react-bootstrap"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { FcLike } from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import { BsFillBookmarkFill } from "react-icons/bs"
import { MdMoreHoriz } from "react-icons/md"
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"
import { useParams } from 'react-router-dom'
import Axios from 'axios'

export default function Blog() {
    const [post, setPost] = useState({});

    let { slug } = useParams()
    console.log(slug)

    useEffect(() => {
        async function getPost() {
            try {
                await Axios.get(`http://localhost:5000/api/post/${slug}`).then(result => {
                    // console.log(result.data)
                    if (result.data.data && result.data.total >= 1) {
                        setPost(result.data.data[0]._source)
                    }
                })

            } catch (error) {
                console.log(error)
            }

        }
        getPost();
    }, [])

    return (
        <>
            <NavBar />
            <div className="blog-container">
                <Container>
                    <div className="row">
                        <div className="col col-md-1 not1">
                            <div className="utilities">
                                <div className="utility-item like">
                                    <FcLike />
                                    <p className="total">0</p>
                                </div>
                                <div className="utility-item comment">
                                    <FaRegComment />
                                    <p className="total">0</p>
                                </div>
                                <div className="utility-item save">
                                    <BsFillBookmarkFill />
                                    <p className="total">0</p>
                                </div>
                                <div className="utility-item more">
                                    <MdMoreHoriz />
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-8 not2">
                            <div className="blog">
                                <div className="blog-image">
                                    <img src={post.coverImg} />
                                </div>
                                <div className="blog-content">
                                    <div className="blog-title">
                                        {post.title}
                                    </div>
                                    <p>
                                        {post.content}
                                    </p>
                                </div>
                                <div className="blog-comment">

                                    <h1>Discussion</h1>
                                    <div className="my-comment row">
                                        <div className="col-md-1 img-col">
                                            <img src={avatar} className="name-avatar" />
                                        </div>
                                        <div className="area-comment col-md-11">
                                            <textarea
                                                type="text"
                                                placeholder="Add to the discussion"
                                            />
                                            <br />
                                            <Button>Submit</Button>
                                        </div>

                                    </div>

                                    {
                                        post.comment &&
                                        post.comment.map(item => {
                                            return (
                                                <div key={item.comment_id} className="general-comment row">
                                                    <div className="col-md-1 img-col ">
                                                        <img src={avatar} className="name-avatar" />
                                                    </div>
                                                    <div className="area-comment col-md-11">
                                                        <span>Thắng Ngô</span>
                                                        <p>{item.message}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>


                            </div>
                        </div>
                        <div className="col col-md-3 not3">
                            <div className="follow-container">
                                <div className="header-black"></div>
                                <div className="following">
                                    <div className="name">
                                        <img src={avatar} />
                                        Thắng Ngô
                                    </div>
                                    <Button>Following</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>


            <Footer />
        </>
    )
}

