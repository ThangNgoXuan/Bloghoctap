import react, { useEffect, useState } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import "../css/profile.css"
import { AiFillLike, AiFillMail } from "react-icons/ai"
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FcLike } from "react-icons/fc"
import { Button, ListGroup } from "react-bootstrap"
import postApi from "../api/postApi"
import userApi from "../api/userApi"

export default function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            userApi.getUserProfile()
                .then((res) => {
                    setName(res.name);
                    setEmail(res.email);
                    setAvatar(res.avatar);
                    console.log(res)
                })
                .catch((err) => {
                    navigate("/login");
                });

            postApi.getTagsOfUser().then(res => {
                setTags(res)
            }).catch(err => {
                console.log(err)
            })

            userApi.listFollowing(userInfo.id).then(res => {
                console.log("following")
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

            function countComment() {
                try {
                    postApi.countComment().then(result => {
                        console.log(result)
                    })
                    return;
                } catch (error) {
                    console.log(error)
                }
            }
            getPostList();
            countComment()
        } else {
            setInterval(() => {
                setLoading(false);
            }, 1000);
            navigate("/login");
        }
    }, [navigate, setName, setEmail, setBlogs]);

    async function getPostList() {
        try {
            postApi.myPost()
                .then(result => {
                    if (result.data && result.total >= 1) {
                        setBlogs(result.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (slug) => {
        navigate(`/editpost/${slug}`);
    };

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
                                        <li><BsFillFileEarmarkPostFill />{blogs.length} Posts</li>
                                    </ul>
                                </div>
                                {
                                    following && following.length > 0 &&
                                    <ListGroup className="list-follow">
                                        <div className="list-follow-title">Your Following</div>
                                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                    </ListGroup>
                                }
                                <ListGroup className="list-tags">
                                    <div className="list-tags-title">Your Tags</div>
                                    {tags &&
                                        tags.map((item, index) => <ListGroup.Item key={index}>{item}</ListGroup.Item>)
                                    }

                                </ListGroup>
                            </div>
                            <div className="col-8 ww">
                                {
                                    blogs.map((post) => {
                                        return (
                                            <div key={post._id} className="blog-item">
                                                <Link to={`/blog/${post._source.slug}`}>
                                                    {
                                                        post._source.coverImg &&
                                                        <img src={post._source.coverImg} />
                                                    }
                                                    <div className="blog-item-content">
                                                        <div className="author">
                                                            <img src={avatar} />
                                                            <div className='qq'>
                                                                <span>{post._source.authorName}</span>
                                                                <span className='day-post'>
                                                                    {new Date(post._source.createdAt).toDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="author-title">
                                                            <div className='tag-post'>
                                                                {
                                                                    post._source.tags.map((item, i) =>
                                                                        <span>{item}</span>
                                                                    )
                                                                }
                                                            </div>
                                                            {post._source.title}
                                                            <br />
                                                            <FcLike /><span>{post._source.likes.length}</span>
                                                            {/* <AiFillLike /><span>5 Reactions</span> */}
                                                            {/* <FaComments /><span>Comments</span> */}

                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="profile-post-button-control">
                                                    <Button
                                                        className="edit-button"
                                                        variant="info"
                                                        onClick={() => {
                                                            handleEdit(post._source.slug);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="edit-button"
                                                        variant="danger"
                                                    // onClick={() => {
                                                    //   handleDelete(blog._id);
                                                    // }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

