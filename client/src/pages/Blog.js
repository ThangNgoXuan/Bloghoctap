import React, { useState, useEffect } from "react"
import Axios from 'axios'
import "../css/blog.css"
import {
    Container,
    Button,
    Card,
    Spinner
} from "react-bootstrap"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import { AiFillLike } from "react-icons/ai"
import { FaComments } from "react-icons/fa"
import { MdMoreHoriz } from "react-icons/md"
import avatar from "../image/avatar.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import commentApi from "../api/commentApi"
import { Link } from "react-router-dom"
import postApi from "../api/postApi"

export default function Blog() {
    const [post, setPost] = useState({});
    const [authorPosts, setAuthorPosts] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    let { slug } = useParams()
    useEffect(() => {
        async function getPost() {
            try {
                await postApi.getPostsBySlug(slug).then(result => {
                    console.log(result.data)
                    if (result?.data) {
                        setPost(result.data[0]._source)
                        setPostId(result.data[0]._id);
                        getComment(result.data[0]._id);
                        getSamePostAuthor(result.data[0]._source.authorId)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        function getSamePostAuthor(authorId) {
            try {
                postApi.samePostOfAuthor(authorId, 5).then(result => {
                    setAuthorPosts(result)

                })
            } catch (error) {
                console.log(error)
            }
        }
        getPost();

    }, [slug])
    async function getComment(postId) {

        try {
            await commentApi.getCommentByPost(postId).then(result => {
                if (result.data) {
                    setComments(result.data)
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    const handleComment = () => {
        if (comment) {
            setSubmitting(true);
            commentApi.newComment({ content: comment, postId: postId })
                .then((res) => {
                    setSubmitting(false);
                    getComment(postId)
                })
                .catch((err) => {
                    setSubmitting(false);
                    setError(true);
                    setErrorMessage(err.response.data.error);
                });
        }
    };

    // const handleFollowing = () =>{
    //     following
    // }

    return (
        <>
            <NavBar />
            <div className="blog-container">
                <Container>
                    <div className="row">
                        <div className="col col-md-1 not1">
                            <div className="utilities">
                                <div className="utility-item like">
                                    <AiFillLike />
                                    <p className="total">{post?.likes?.length}</p>
                                </div>
                                <div className="utility-item comment">
                                    <FaComments />
                                    <p className="total">{comments?.length || 0}</p>
                                </div>
                                <div className="utility-item more">
                                    <MdMoreHoriz />
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-8 not2">
                            <div className="blog">
                                {/* <div className="blog-image">
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
                                 */}
                                <Card>
                                    <Card.Img src={post.coverImg} />
                                    <Card.Body>
                                        <div>
                                            {post.authorName}
                                            <br />
                                            {new Date(post.createdAt).toDateString()}
                                        </div>
                                        <h1>{post.title}</h1>
                                        <div
                                            className="blog-content"
                                            dangerouslySetInnerHTML={{ __html: post.content }}
                                        ></div>
                                    </Card.Body>
                                </Card>
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
                                                onChange={(e) => setComment(e.target.value)}
                                                value={comment}
                                            />
                                            <br />
                                            <Button
                                                type="submit"
                                                variant="success"
                                                className="mt-3 submit"
                                                {...(submitting ? { disabled: true } : {})}
                                                onClick={handleComment}
                                            >
                                                {submitting ? (
                                                    <Spinner as="span" animation="border" role="status" />
                                                ) : (
                                                    "Publish"
                                                )}
                                            </Button>
                                        </div>

                                    </div>

                                    {

                                        comments.map(item => {
                                            return (
                                                <div key={item._id} className="general-comment row">
                                                    <div className="col-md-1 img-col ">
                                                        <img src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                                                            className="name-avatar" />
                                                    </div>
                                                    <div className="area-comment col-md-11">
                                                        <span>{item._source.authorName}</span>
                                                        <p>{item._source.content}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col col-md-3 not3 right-bar">
                            <div className="follow-container">
                                {/* <div className="header-black"></div> */}
                                <div className="following">
                                    <div className="name">
                                        {/* <img src={avatar} /> */}
                                        {post.authorName}
                                    </div>
                                    <Button>Following</Button>
                                </div>
                            </div>

                            <div className="same-author-posts">
                                <div className="header-same-posts">More from <span>{post.authorName}</span></div>
                                {
                                    authorPosts &&
                                    authorPosts.map(item => {
                                        return (
                                            <Link to={`/blog/${item._source.slug}`} key={item._id} className="same-post-item">
                                                <div className="same-post-title">{item._source.title}</div>
                                                <div className="hashtags">{item._source.tags.join('  ')}</div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>


            <Footer />
        </>
    )
}

