import React, {useState, useEffect} from "react"
import "../css/blog.css"
import { 
    Container,
    Row,
    Col,
    Button

} from "react-bootstrap"
import NavBar from "./NavBar"
import Footer from "./Footer"
import {FcLike} from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import {BsFillBookmarkFill} from "react-icons/bs"
import {MdMoreHoriz} from "react-icons/md"
import imgtitle from "../image/image.png"
import avatar from "../image/avatar.jpg"

export default function Blog() {
    return (
        <>
        <NavBar/>
        <div className="blog-container">
            <Container>
                <div className="row">
                    <div className="col col-md-1 not1">
                        <div className="utilities">
                            <div className="utility-item like">
                                <FcLike/>
                                <p className="total">0</p>
                            </div>
                            <div className="utility-item comment">
                                <FaRegComment/>
                                <p className="total">0</p>
                            </div>
                            <div className="utility-item save">
                                <BsFillBookmarkFill/>
                                <p className="total">0</p>
                            </div>
                            <div className="utility-item more">
                                <MdMoreHoriz/>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-8 not2">
                        <div className="blog">
                            <div className="blog-image">
                                <img src={imgtitle}/>
                            </div>
                            <div className="blog-content">
                                <div className="blog-title">
                                    Danh sách các Framework để tạo ra các ý tưởng khi làm Product
                                </div>
                                <p>{`
                                1. Ask why in a hard way
                                ・Tại sao lại chưa có thang máy để đi thẳng lên vũ trụ?
                                ・Tại sao chỉ có thể pha cà phê bằng nước nóng?
                                Đây là phương pháp giúp bạn nảy ra những ý tưởng hay ho bằng đặt ra hàng loạt những câu hỏi "tại sao" cho những vấn đề vốn tưởng là đương nhiên cuộc sống này.
                                =>Thử thách và bức phá với những thứ tưởng chừng là dĩ nhiên trong cuộc sống này và luôn hoài nghi về thực trạng hiện hữu.
                                (Challenge the assumption. Question the status quo.)
                                Việc đặt ra câu hỏi tại sao ở đây không phải là bạn muốn đào sâu tìm hiểu ra vấn đề cốt lỗi mà chỉ đơn giản là bạn sẽ mở ra được một góc nhìn mới nào đó từ đó sẽ giúp bạn nảy ra được những ý tưởng hay ho ?!
                                <br/>  
                                2. Phân rã thuộc tính
                                Đây là phương pháp tạo ra ý tưởng bằng cách phân nhỏ các thuộc tính cấu tạo nên đối tượng. (Chắc hơi khó hiểu ha😕😅)
                                Ví dụ:
                                Ta chia nhỏ đối tượng thành nhiều thuộc tính như

                                Chất liệu
                                Hình dáng
                                Màu sắc
                                Tiếp theo đối với từng thuộc tính ta lại phân nhỏ ra thành nhiều thuộc tính chi tiết hơn

                                Chất liệu
                                Nhựa
                                Plastic
                                Kim loại
                                Hình dáng
                                Tròn
                                Vuông
                                Màu sắc
                                Đỏ
                                Xanh
                                Ở giai đoạn hình thành ý tưởng, bạn càng có nhiều thuộc tính(khía cạnh) bạn càng có thể nhận thấy nhiều điểm mù.

                                To be continue...
                                `}
                                </p>
                            </div>
                            
                        
                            <div className="blog-comment">
                                
                                <h1>Discussion</h1>
                                <div className="my-comment row">
                                      <div className="col-md-1 img-col">
                                        <img src={avatar} className="name-avatar"/>
                                    </div>
                                    <div className="area-comment col-md-11"> 
                                        <textarea 
                                        type="text"
                                        placeholder="Add to the discussion"
                                        />
                                        <br/>
                                        <Button>Submit</Button>
                                    </div>
                           
                                </div>
                               
                                <div className="general-comment row">
                                    <div className="col-md-1 img-col ">
                                        <img src={avatar} className="name-avatar"/>
                                    </div>
                                    <div className="area-comment col-md-11"> 
                                        <span>Thắng Ngô</span>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>                                        
                                    </div>
                                </div>
                                
                                <div className="general-comment row">
                                    <div className="col-md-1 img-col ">
                                        <img src={avatar} className="name-avatar"/>
                                    </div>
                                    <div className="area-comment col-md-11"> 
                                        <span>Thắng Ngô</span>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>                                        
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col col-md-3 not3">
                        <div className="follow-container">
                            <div className="header-black"></div>
                            <div className="following">
                                <div className="name">
                                    <img src={avatar}/>
                                    Thắng Ngô
                                </div>
                                <Button>Following</Button>
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

