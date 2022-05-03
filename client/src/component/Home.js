import Footer from "./Footer"
import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"

import "../css/home.css"
import "../css/search.css"
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
import { Link } from "react-router-dom"

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
                    <div className="row justify-content-md-center">
                        <div className="col-6 content-area">
                            <h1> Bài viết</h1>
                            {
                                posts.map((post) => {
                                    return (
                                        <div key={post._id} className="blog-item">
                                            <Link to={`/blog/${post._source.slug}`}>
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
                                            </Link>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="col-3 more-area">
                            <div className="more-area-header"></div>
                            <div className="more-area-tag">
                                <div className="tag-header">#tagname</div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                            </div>

                            {/* tag1 */}
                            <div className="more-area-tag">
                                <div className="tag-header">#tagname</div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                            </div>

                            {/* tag2 */}
                            <div className="more-area-tag">
                                <div className="tag-header">#tagname</div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
                                </div>
                                <div className="tag-content">
                                    Bạn có biết công việc của UX Designer là gì? - Nguyễn Đức Lượng
                                    <br />
                                    <span className="tag-content-comment">3 comments</span>
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
