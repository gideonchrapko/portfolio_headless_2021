import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import Arrow from '../../Assets/proj_arrows_white.svg'

import './nav.css';

const NavBar = ({slugRoute, postData}) => {
    const [route, setRoute] = useState()
    const [menuVisible, setMenuVisible] = useState(false);
    const history = useHistory();
    const path = history.location.pathname
    const newString = path.replace('/', '');
    const pathString = newString.substring(0,7)
    const spring = { duration: 0.5, ease: [0.4, 0.13, 0.23, 0.96]}
    const [titleIndex, setTitleIndex] = useState(null)

    useEffect(() => {
        if(postData === null){
            console.log("postdata null")
        } else {
            setTitleIndex(postData && postData.findIndex(project => project.slugRoute.current === slugRoute))
        }
    },[postData])

    const titleIndexLength = postData && postData.length - 1

    useEffect(() => {
        setMenuVisible(!menuVisible)
        window.scrollTo(0,0)
        console.log(titleIndex, "titleIndex")
      },[])

      useEffect(() => {
            // this needs to be reworked for 404 pages 
            if (pathString === "project") {
                setRoute("project")
            } else {
                setRoute("home")
            }
      },[route])

        function handleHoverLeft() {
            if(titleIndex > 0){
                setTitleIndex(titleIndex - 1)
            } 
            if (titleIndex === 0) {
                setTitleIndex(titleIndexLength)
            }
        }

        function handleOutLeft() {
            if(titleIndex === titleIndexLength){
                setTitleIndex(0)
            } else {
                setTitleIndex(titleIndex + 1)
            }
        }

        function handleHoverRight() {
            if(titleIndex < titleIndexLength) {
                setTitleIndex(titleIndex + 1)
            } else {
                setTitleIndex(0)
            }
        }

        function handleOutRight() {
            if(titleIndex === 0) {
                setTitleIndex(titleIndex + titleIndexLength)
            } else {
                setTitleIndex(titleIndex - 1)
            }
        }

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
                            <Col 
                                lg={2} 
                                xs={2} 
                                style={{ textAlign: "center" }} 
                            >
                                <a className="nav-text" href="#">
                                    <img 
                                        src={Arrow} 
                                        className="nav-arrow" 
                                        style={{ transform: "rotate(225deg)" }}
                                        onPointerOver={() => handleHoverLeft()}
                                        onPointerOut={() => handleOutLeft()}
                                        onClick={() => history.push(`/project/${postData[titleIndex].slugRoute.current}`) }
                                    />
                                </a>
                            </Col> 
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <a className="nav-text" href="#">
                                    {titleIndex !== null ?
                                        postData[titleIndex && titleIndex].projectTitle
                                        :
                                        "...Loading"
                                    }
                                </a>
                            </Col>
                            <Col 
                                lg={2} 
                                xs={2} 
                                style={{ textAlign: "center" }}
                            >
                                <a className="nav-text" href="#">
                                    <img   
                                        src={Arrow} 
                                        className="nav-arrow" 
                                        style={{ transform: "rotate(45deg)" }}
                                        onPointerOver={() => handleHoverRight()}
                                        onPointerOut={() => handleOutRight()}
                                        onClick={() => history.push(`/project/${postData[titleIndex].slugRoute.current}`) }
                                    />
                                </a>
                            </Col> 
                        </>
                    }
                </Row>
            </Container>
        </motion.div>
    )
}

export default NavBar