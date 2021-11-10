import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './nav.css';
const NavBar = () => {


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