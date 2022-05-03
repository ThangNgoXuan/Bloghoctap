import react, { useEffect, useState } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import "../css/profile.css"
import { AiFillLike, AiFillMail } from "react-icons/ai"
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState([]);
    const [isBlog, setIsBlog] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/user/profile`, {
                    token: userInfo.token,
                    _id: userInfo.id
                })
                .then((res) => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setAvatar(res.data.avatar);
                    //   setBlogs(res.data.blogs);
                    //   setLikedBlogs(res.data.likedBlogs);
                    // setInterval(() => {
                    //     setLoading(false);
                    // }, 1000);
                    console.log(res.data)
                })
                .catch((err) => {
                    // setInterval(() => {
                    //     setLoading(false);
                    // }, 1000);
                    navigate("/login");
                });
        } else {
            setInterval(() => {
                setLoading(false);
            }, 1000);
            navigate("/login");
        }
    }, [navigate, setName, setEmail, setBlogs, setLikedBlogs]);

    return (
        <>
            <NavBar />
            <div className="profile-container">
                <div className="row justify-content-center profile-content">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12 profile-about">
                                <img src={avatar} />
                                <h3>{name}</h3>
                                {/* <span>Cứ thong thả thôi </span> */}
                                <div className="sticker">
                                    <ul>
                                        <li><AiFillMail />{email}</li>
                                    </ul>
                                </div>
                                <div className="btn btn-primary edit-btn">Edit</div>
                            </div>
                        </div>
                        <div className="row qq">
                            <div className="col-4 ss">
                                <div className="statistics">
                                    <ul>
                                        <li><AiFillLike />10 Likes</li>
                                        <li><FaComments />20 Commets</li>
                                        <li><BsFillFileEarmarkPostFill />5 Posts</li>
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
                                                <br />
                                                <AiFillLike /><span>Reactions</span>
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
                                                <br />
                                                <AiFillLike /><span>Reactions</span>
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
                                                <br />
                                                <AiFillLike /><span>Reactions</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



            <Footer />

        </>
    )
}

