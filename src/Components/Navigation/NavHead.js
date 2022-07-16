import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const NavHead = () => {
    return (
        <div style={{ position: "fixed", zIndex: "8" }}>
        <Container fluid className="fixed-top" style={{ backgroundColor: "white" }}> 
            <Row style={{ width: "100vw", paddingTop: "20px" }}>
                <Col
                    lg={5}
                    md={5}
                    sm={10}
                    xs={10}
                    style={{ textAlign: "center"}}
                >
                   <h1 className="text-nav-head" >UX Designer and Developer</h1>
                </Col>
                <Col lg={{ span: 2, offset: 1}} style={{ textAlign: "center"}} >
                    <a className="text-nav-head link d-xs-none d-md-none d-none d-lg-block" 
                        href="mailto: gideonchrapko@gmail.com"
                    >
                        Contact
                    </a>
                </Col>
                <Col lg={2} style={{ textAlign: "center"}} >
                    <a className="text-nav-head link d-xs-none d-md-none d-none d-lg-block d-md-block" 
                        href="https://www.instagram.com/gideonchrapko/"
                    >
                        Instagram
                    </a>
                </Col>
                <Col lg={2} style={{ textAlign: "center"}} >
                    <a className="text-nav-head link d-xs-none d-md-none d-none d-lg-block d-md-block" 
                    href="https://www.linkedin.com/in/gideon-chrapko-230220a0/"
                    >
                        Linkedin
                    </a>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default NavHead;