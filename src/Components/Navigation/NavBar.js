import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import sanityClient from '../../client';
import { motion } from 'framer-motion';
import Arrow from '../../Assets/proj_arrows_white.svg'

import './nav.css';

const NavBar = ({slugRoute}) => {
    const [route, setRoute] = useState()
    const [postData, setPostData] = useState(null)
    // const [sanityRoute, setSanityRoute] = useState()
    const [menuVisible, setMenuVisible] = useState(false);
    const history = useHistory();
    const path = history.location.pathname
    const newString = path.replace('/', '');
    const pathString = newString.substring(0,7)

    const spring = { duration: 0.5, ease: [0.4, 0.13, 0.23, 0.96]}

    useEffect(() => {
        setMenuVisible(true)
      },[])

      useEffect(() => {
            if (pathString === "project") {
                setRoute("project")
            } else {
                setRoute("home")
            }
      },[route])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            slugRoute,
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
      },[postData])

    //   project.slugRoute.current

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={spring}
            className="fixed-bottom blend"
        >
            <Container >
                <Row className="nav-container" >   
                    <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                        <a className="nav-text" href="#" onClick={() => history.push('/')}>{route === "home" ? "About" : "Home"}</a>
                    </Col>
                    {route === "home" ?
                        <>
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#" >Projects</a>
                            </Col>
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#">CV</a>
                            </Col> 
                         </>
                         :
                         <>
                            <Col lg={2} xs={2} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#"><img src={Arrow} style={{ height: '5vh', width:"auto", transform: "rotate(225deg)" }}/></a>
                            </Col> 
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#">{slugRoute}</a>
                            </Col>
                            <Col lg={2} xs={2} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#"><img src={Arrow} style={{ height: '5vh', width:"auto", transform: "rotate(45deg)" }}/></a>
                            </Col> 
                        </>
                    }
                </Row>
            </Container>
        </motion.div>
    )
}

export default NavBar