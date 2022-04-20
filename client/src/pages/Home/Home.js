import Footer from "./Footer"
import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"

import "../css/home.css"
import "../css/navbar.css"
import { Container } from "react-bootstrap"
import { DiAngularSimple } from "react-icons/di";
import { DiApple } from "react-icons/di";
import { DiCoda } from "react-icons/di";
import { DiCloud9 } from "react-icons/di";
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"
import { FcLike } from "react-icons/fc"
export default function Home() {
    return (
        <>
            <NavBar />
            <div className="home-container ">
                <Container>
                    <div className="row">
                        <div className="col-3 search-area">
                            <nav id="menu">
                                <ul class="main-menu">
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
                            <div className="blog-item">
                                <a href="/blog">
                                    <img src={imgtitle} />
                                    <div className="blog-item-content">
                                        <div className="author">
                                            <img src={avatar} />
                                            Thắng Ngô
                                        </div>
                                        <div className="author-title">
                                            Danh sách các Framework để tạo ra các ý tưởng khi làm Product
                                            <br />
                                            <FcLike /><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="blog-item">
                                <a href="/blog">
                                    <div className="blog-item-content">
                                        <div className="author">
                                            <img src={avatar} />
                                            Thắng Ngô
                                        </div>
                                        <div className="author-title">
                                            Danh sách các Framework để tạo ra các ý tưởng khi làm Product
                                            <br />
                                            <FcLike /><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="blog-item">
                                <a href="/blog">
                                    <div className="blog-item-content">
                                        <div className="author">
                                            <img src={avatar} />
                                            Thắng Ngô
                                        </div>
                                        <div className="author-title">
                                            Danh sách các Framework để tạo ra các ý tưởng khi làm Product
                                            <br />
                                            <FcLike /><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

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

