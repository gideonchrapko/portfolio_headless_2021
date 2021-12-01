import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import './nav.css';

const NavBar = () => {
    const [route, setRoute] = useState()
    // const history = useHistory();
    // const path = history.location.pathname
    const path = window.appHistory.location.pathname
    const newString = path.replace('/', '');
    const pathString = newString.substring(0,7)

    useEffect(() => {
        if(pathString === "project"){
            setRoute(true)
        } 
        if(path === '/'){
            setRoute(false)
        }
    },[route])

    // console.log(path)

    return (
            <Container >
                <Row className="nav-container" >   
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">About</a>
                    </Col>


                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">Projects</a>
                    </Col>
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">CV</a>
                    </Col>
                </Row>
            </Container>
    )
}

export default NavBar