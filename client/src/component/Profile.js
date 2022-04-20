import react from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import avatar from "../image/avatar.jpg"
import { Container } from "react-bootstrap"
import "../css/profile.css"
import imgtitle from "../image/image.png"
import {AiFillLike} from "react-icons/ai"
import { Button } from "react-bootstrap"
import { FaPeriscope } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";




export default function Profile() {
    return (
        <>
        <NavBar/>
        <div className="profile-container">
            <div className="row justify-content-center profile-content">
                <div className="col-8">
                    <div className="row">
                        <div className="col-12 profile-about">
                            <img src={avatar}/>
                            <h3>Ngô Xuân Thắng</h3>
                            <span>Cứ thong thả thôi </span>
                            <div className="sticker">
                                <ul>
                                    <li><FaPeriscope/>Hanoi, Vietnam</li>
                                    <li><FaBirthdayCake/>02/02/2000</li>
                                    <li><AiFillMail/>thangngo.it@gmail.com</li>
                                </ul>
                            </div>
                            <div className="btn btn-primary edit-btn">Edit</div>
                        </div>
                    </div>
                    <div className="row qq">
                        <div className="col-4 ss">
                            <div className="statistics">
                                <ul>
                                    <li><AiFillLike/>10 Likes</li>
                                    <li><FaComments/>20 Commets</li>
                                    <li><BsFillFileEarmarkPostFill/>5 Posts</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-8 ww">
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
                                            <AiFillLike/><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* 1 */}

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
                                            <AiFillLike/><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* 2 */}

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
                                            <AiFillLike/><span>Reactions</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>



        <Footer/>

        </>
    )
}

