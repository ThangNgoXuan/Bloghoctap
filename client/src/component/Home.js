import Footer from "./Footer"
import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"

import "../css/home.css"
import { Container } from "react-bootstrap"
import { DiAngularSimple } from "react-icons/di";
import { DiApple } from "react-icons/di";
import { DiCoda } from "react-icons/di";
import { DiCloud9 } from "react-icons/di";
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"
import { FcLike } from "react-icons/fc"
import { AiFillHome } from "react-icons/ai"
import Axios from 'axios';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPostList() {
            try {
                Axios.get("http://localhost:5000/api/post").then(result => {
                    // console.log(result.data)
                    if (result.data.data && result.data.total >= 1) {
                        setPosts(result.data.data)
                        // console.log(result.data.data)
                    }
                })

            } catch (error) {
                console.log(error)
            }

        }
        getPostList();
    }, [])
    console.log(posts)

    return (
        <>
            <NavBar />
            <div className="home-container ">
                <Container>
                    <div className="row">
                        <div className="col-3 search-area">
                            <nav id="menu">
                                <ul className="main-menu">
                                    <li><a className="li-title" href="#">Blog học tập việt nam</a>
                                        <ul>
                                            <li><a className="li-item" href="#"><DiCloud9 />Toán</a></li>
                                            <li><a className="li-item" href="#"><DiCoda />Lí</a></li>
                                            <li><a className="li-item" href="#"><DiApple />Hóa</a></li>
                                            <li><a className="li-item" href="#"><DiAngularSimple />Tiếng anh</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="li-title" href="#">Công thức rút gọn</a>
                                        <ul>
                                            <li><a className="li-item" href="#"><DiCloud9 />Toán</a></li>
                                            <li><a className="li-item" href="#"><DiCoda />Lí</a></li>
                                            <li><a className="li-item" href="#"><DiApple />Hóa</a></li>
                                            <li><a className="li-item" href="#"><DiAngularSimple />Tiếng anh</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="li-title" href="#">Mục khác</a>
                                        <ul>
                                            <li><a className="li-item" href="#"><DiCloud9 />Toán</a></li>
                                            <li><a className="li-item" href="#"><DiCoda />Lí</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-6 content-area">
                            <h1> Bài viết</h1>
                            {
                                posts.map((post) => {
                                    return (
                                        <div key={post._id} className="blog-item">
                                            <a href="/blog">
                                                <img src={post._source.coverImg} />
                                                <div className="blog-item-content">
                                                    <div className="author">
                                                        <img src={avatar} />
                                                        Thắng Ngô
                                                    </div>
                                                    <div className="author-title">
                                                        {post._source.title}
                                                        <br />
                                                        <FcLike /><span>Reactions</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="col-3 more-area">
                            more
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}
