import Footer from "./Footer"
import NavBar from "./NavBar"
import React, {useState, useEffect} from "react"

import "../css/home.css"
import { Container } from "react-bootstrap"
import { DiAngularSimple } from "react-icons/di";
import { DiApple } from "react-icons/di";
import { DiCoda } from "react-icons/di";
import { DiCloud9 } from "react-icons/di";
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"
import {FcLike} from "react-icons/fc"
import {AiFillHome} from "react-icons/ai"
export default function Home() {
    return (
        <>
        <NavBar/>
        <div className="home-container ">
            <Container>
                <div className="row">
                    <div className="col-2 search-area">
                        <div className="list-area">
                            <h3>Diễn đàn UI/UX Việt Nam</h3>
                            <ul>
                                <li><a><AiFillHome/>Home</a></li>
                                <li><a><AiFillHome/>Thiết kế</a></li>
                                <li><a><AiFillHome/>UI desgin</a></li>
                                <li><a><AiFillHome/>Ux Design</a></li>
                                <li><a><AiFillHome/>Danh sách đọc</a></li>
                                <li><a><AiFillHome/>Quà tặng</a></li>
                            </ul>
                        </div>

                        <div className="list-area">
                            <h3>Môn học tự nhiên</h3>
                            <ul>
                                <li><a><AiFillHome/>Home</a></li>
                                <li><a><AiFillHome/>Thiết kế</a></li>
                                <li><a><AiFillHome/>UI desgin</a></li>
                            </ul>
                        </div>

                        <div className="list-area">
                            <h3>Công thức nhanh</h3>
                            <ul>
                                <li><a><AiFillHome/>Home</a></li>
                                <li><a><AiFillHome/>Thiết kế</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 content-area">
                        <div className="search-date">
                        <h1> Bài viết</h1>
                        <ul>
                            <li><a>Feed</a></li>
                            <li><a>Week</a></li>
                            <li><a>Month</a></li>
                            <li><a>Year</a></li>
                            <li><a>Infinity</a></li>
                            <li><a>Latest</a></li>
                        </ul>
                        </div>
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
                                        <br/>
                                        <FcLike/><span>Reactions</span>
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
                                        <br/>
                                        <FcLike/><span>Reactions</span>
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
                                        <br/>
                                        <FcLike/><span>Reactions</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        
                    </div>

                    <div className="col-3 more-area">
                        <div className="more-area-header"></div>
                        <div className="more-area-tag">
                            <div className="tag-header">#tagname</div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                        </div>

                        {/* tag1 */}
                        <div className="more-area-tag">
                            <div className="tag-header">#tagname</div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                        </div>

                        {/* tag2 */}
                        <div className="more-area-tag">
                            <div className="tag-header">#tagname</div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                            <div className="tag-content">
                                Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                <br/>
                                <span className="tag-content-comment">3 comments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            
        </div>
        <Footer/>
        </>
    )
}

