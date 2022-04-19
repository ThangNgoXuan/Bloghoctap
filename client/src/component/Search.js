import react from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { 
    Container,
    Col,     
} from "react-bootstrap"
import "../css/search.css"
import {FcLike} from "react-icons/fc"
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"

export default function Search() {
    return (
        <>
        <NavBar/>
        <div className="search-container">
            <div className="container container-body">
                <div className="row  justify-content-md-center">
   
                    <div className="col-3 search-list">
                        <h1>Search results</h1>
                        <ul>
                            <li><a href="#">Post</a></li>
                            <li><a href="#">Comment</a></li>
                            <li><a href="#">People</a></li>
                            <li><a href="#">Tag</a></li>
                        </ul>
                        
                    </div>

                    <div className="col-7">
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

                        {/* blog2 */}

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

                        {/* blog 3 */}

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
                </div>
            </div>
        </div>



        <Footer/>
        </>
    )
}


