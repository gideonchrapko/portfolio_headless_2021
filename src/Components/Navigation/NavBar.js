import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring'

import './nav.css';

const NavBar = () => {
    const [rightMenuVisible, setRightMenuVisible] = useState(false);

useEffect(() => {
    setRightMenuVisible(true)
})

const rightMenuAnimation = useSpring({
    opacity: rightMenuVisible ? 1 : 0,
    transform: rightMenuVisible ? `translateY(0px)` : `translateY(100px)`,
    config: {
        mass: 1,
        tension: 50,
        friction: 12,
      }
  }); 

    return (
        <animated.div style={rightMenuAnimation} className="fixed-bottom blend">
            <Container >
                <Row className="nav-container" >   
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">Home</a>
                    </Col>
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">Projects</a>
                    </Col>
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#">CV</a>
                    </Col>
                </Row>
            </Container>
        </animated.div>
    )
}

export default NavBar