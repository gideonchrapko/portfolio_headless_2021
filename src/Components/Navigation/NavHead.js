import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const NavHead = () => {
    return (
        <div>
        <Container fluid className="fixed-top"> 
            <Row style={{ width: "100vw", paddingTop: "20px" }}>
                <Col
                    lg={5}
                    md={5}
                    sm={5}
                    xs={5}
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