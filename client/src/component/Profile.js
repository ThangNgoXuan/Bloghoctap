import react from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import avatar from "../image/avatar.jpg"
import { Container } from "react-bootstrap"




export default function Profile() {
    return (
        <>
        <NavBar/>
        <div className="profile-container">
            <div className="black-title"/>
            <img src={avatar} />
            <Container>
                

            </Container>

        </div>



        <Footer/>

        </>
    )
}

