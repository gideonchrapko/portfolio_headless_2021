import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import Arrow from '../../Assets/proj_arrows_white.svg'

import './nav.css';

const NavBar = ({slugRoute, postData}) => {
    const [route, setRoute] = useState()
    const [menuVisible, setMenuVisible] = useState(false);
    const [hoverRight, setHoverRight] = useState(false)
    const [hoverLeft, setHoverLeft] = useState(false)
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

        console.log(titleIndex, "title index")
        console.log(postData, "postDataString")

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
                        <h5 className="nav-text" onClick={() => history.push('/')}>{route === "home" ? "About" : "Home"}</h5>
                    </Col>
                    {route === "home" ?
                        <>
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <h5 className="nav-text" >Projects</h5>
                            </Col>
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <h5 className="nav-text" >CV</h5>
                            </Col> 
                         </>
                         :
                         <>
                            <Col 
                                lg={2} 
                                xs={2} 
                                style={{ textAlign: "center" }} 
                            >
                                <h5 className="nav-text">
                                    <img alt="Click for next project"
                                        src={Arrow} 
                                        className="nav-arrow" 
                                        style={{ transform: `rotate(225deg) scale(${hoverLeft ? 1.1 : 1})` }}
                                        onPointerOver={e => {
                                            handleHoverLeft()
                                            setHoverLeft(true)
                                        }}
                                        onPointerOut={e => {
                                            handleOutLeft()
                                            setHoverLeft(false)
                                        }}
                                        onClick={() => history.push(`/project/${postData[titleIndex].slugRoute.current}`) }
                                    />
                                </h5>
                            </Col> 
                            <Col lg={4} xs={4} style={{ textAlign: "center"}}>
                                <h5 className="nav-text">
                                    {titleIndex !== null ?
                                        postData[titleIndex && titleIndex].projectTitle
                                        :
                                        "...Loading"
                                    }
                                </h5>
                            </Col>
                            <Col 
                                lg={2} 
                                xs={2} 
                                style={{ textAlign: "center" }}
                            >
                                <h5 className="nav-text">
                                    <img alt="Click for previous project"
                                        src={Arrow} 
                                        className="nav-arrow" 
                                        style={{ transform: `rotate(45deg) scale(${hoverRight ? 1.1 : 1})` }}
                                        onPointerOver={e => {
                                            handleHoverRight()
                                            setHoverRight(true)
                                        }}
                                        onPointerOut={e => {
                                            handleOutRight()
                                            setHoverRight(false)
                                        }}
                                        onClick={() => history.push(`/project/${postData[titleIndex].slugRoute.current}`) }
                                    />
                                </h5>
                            </Col> 
                        </>
                    }
                </Row>
            </Container>
        </motion.div>
    )
}

export default NavBar