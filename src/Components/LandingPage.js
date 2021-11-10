import React, { useState, useEffect, Suspense } from 'react';
import sanityClient from '../client';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { SpotLight, Html } from '@react-three/drei';
// import { useTrail, animated, useSpring, useSprings } from 'react-spring';
import BlockContent from '@sanity/block-content-to-react';
import { motion } from 'framer-motion'

import Controls from './3D/Controls';
import Model from './3D/SignNeon';

import ArrowWhite from '../Assets/proj_arrows_white.svg';
import CircleBG from '../Assets/EllipseLanding.svg'
import '../index.css';

const LandingPage = () => {
    const [iHovered, setiHovered] = useState(false)
    const [postData, setPostData] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    // const [open, setOpen] = useState(false)
    
    // const [rightMenuVisible, setRightMenuVisible] = useState(false);
    // const [stateAnim, setStateAnim] = useState(false)

    // const [rotate, setRotate] = useState()


    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            mainImage{
                asset->{
                  _id,
                  url
                },
                alt
              },
            thumbImage{
                asset->{
                  _id,
                  url
                },
                alt
              },
            slugRoute,
            projectTitle,
            projectOverview,
            role,
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
        // setOpen(true)
      },[postData])

      const variants = {
        open: { width: "40%" },
        closed: { width: "80%" }
      }

      const variantsRight = {
        first: { width: "40vw" },
        second: { width: "0" }
      }

      const spring = {
        duration: 0.4,
        ease: [0.4, 0.13, 0.23, 0.96]
      }

    return (
        <Container fluid>
            <div className="container-section">
                    <Row>
                        <Col
                            lg={{ offset: 1, span: 5 }}
                            xs={{ offset: 1, span: 5 }}
                        >
                            <div>
                                <h1 className="nameTitle">Gideon</h1>
                                <h1 className="nameTitle">Chrapko</h1>
                            </div>
                            <img />
                        </Col>
                        <Col lg={6} style={{ height: "100vh", right: "0", position: "absolute", marginTop: "-40vh" }}>
                        <Canvas shadows>
                            <color attach="background" args={['white']}/>
                                <Suspense fallback={<Html center>...Loading</Html>}>
                                        <pointLight position={[0, 1, 0]} intensity={1} color={'white'} />
                                        <ambientLight intensity={3} />
                                            <Model position={[0, 1.3, 0]} />
                                        <Controls />
                                </Suspense>
			            </Canvas>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "-10px"}} >
                        <Col
                            lg={{ offset: 1, span: 4 }}
                            xs={{ offset: 1, span: 6 }}
                        >
                            <h4 className="subheadTitle">UX & UI CASE STUDY ONLINE</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            lg={{ offset: 1, span: 1 }}
                            md={{ offset: 1, span: 1 }}
                            sm={{ offset: 1, span: 1 }}
                            xs={{ offset: 1, span: 1 }}
                        >
                            <h1 className="subheadDate">2021</h1>
                        </Col>
                        <Col
                            lg={{ offset: 0, span: 2 }}
                            md={{ offset: 0, span: 2 }}
                            sm={{ offset: 0, span: 2 }}
                            xs={{ offset: 0, span: 3 }}
                        >
                            <h6 className="bodyDescrip">I am currently a third year student enrolled in the Alberta University of the Arts in the Bachelor of Design program.</h6>
                        </Col>
                        <Col
                            lg={{ offset: 0, span: 2 }}
                            xs={{ offset: 0, span: 3 }}
                        >
                            <h6 className="bodyDescrip">I currently am working in UI/UX design and development working with several front end technologies and utilizing javascript frameworks such as Reactjs, Threejs and bootstrap.</h6>
                        </Col>
                    </Row>
                </div>

                <div className="container-section">
                        {postData &&
                        postData.map((project, index) => (
                            <motion.div className="gx-3 proj_row row" 
                                onMouseEnter={e => {
                                    setiHovered(index)
                                    setImgSrc(project.mainImage.asset.url)
                                }}
                                onMouseLeave={e => {
                                    setiHovered(false)
                                    setImgSrc(null)
                                }}
                                animate={iHovered !== false ? "open" : "closed"}
                                variants={variants}
                                transition={spring}
                                style={{backgroundColor: iHovered === index ? "#0AFF00" : "#BAFF00" }}
                                key={index}
                            >
                                <Col lg={1} className="proj_col" >
                                    <img src={project.thumbImage.asset.url} alt={project.slugRoute.current} className="proj_img_thumb"/>
                                </Col>
                                <Col lg={2} className="proj_col" >
                                    <h1 key={index} to={"/project/" + project.slugRoute.current} className="proj_header">{project.projectTitle}</h1>
                                </Col>
                                <Col lg={iHovered !== false ? 6 : 4} className="proj_description">
                                    {index === iHovered ? 
                                    <h1 className="proj_view_text">View Project</h1>
                                        : 
                                     <BlockContent 
                                        blocks={project.projectOverview} 
                                        projectId="kjeh3i1n"
                                        dataset="production"
                                    />
                                    }
                                </Col>
                                <Col lg={iHovered !== false ? 3 : 5} className="proj_col">
                                    {iHovered !== false ?
                                        <div> 
                                        </div> :
                                        <div style={{ backgroundImage: `url(${project.mainImage.asset.url})` }} 
                                            alt={`"${project.slugRoute.current} image"`} className="proj_mainImage" > 
                                        </div>                                   
                                    }
                                    <img 
                                        src={ArrowWhite}   
                                        alt="arrow" 
                                        className="proj_arrow" 
                                        style={{
                                            transform: iHovered === index ? "rotate(45deg)" : "rotate(0deg)",
                                            transition: "transform .35s ease-in-out"
                                            }}
                                    />                                  
                                </Col>
                            </motion.div>
                        ))}
                        <motion.div 
                            className="proj_row_img"
                            variants={variantsRight}
                            animate={iHovered !== false ? "first" : "second"}
                            transition={spring}
                        >
                            <div 
                                style={{ backgroundImage: `url(${imgSrc})` }}
                                alt={`"${imgSrc} image"`}
                                className="roj_row_img_anim"
                            >
                            </div>
                        </motion.div>
                </div>
                <div className="container-section conatiner-cv">
                    <Row className="gx-3">
                        <Col lg={{ span: 5, offset: 1 }}>
                            <h6 className="cv_title">CONTACT</h6>
                            <div className="modular-cont">
                                <h1 className="cv-contact">gideonchrapko@gmail.com</h1>
                             </div>
                        </Col>
                        <Col lg={1}>
                                <h6 className="cv_title">YEARS ACTIVE</h6>
                                <div className="modular-cont">
                                    <h1 className="cv-ya">4</h1>
                                </div>
                        </Col>
                        <Col lg={4}>
                                <h6 className="cv_title">RECOGNITIONS</h6>
                                <div className="modular-cont">
                                    <h1 className="work-exp-head">SANDHU PUBLISHING</h1>
                                    <h3 className="work-exp-sub">2022, CALGARY</h3>
                                    <h6 className="work-exp-body">Works featured in My Graphic DNA as well as Geo Graphics.</h6>
                                </div>

                        </Col>
                    </Row>
                    <Row className="gx-3">
                        <Col lg={{ span: 6, offset: 1 }}>
                                <h6 className="cv_title">WORK EXPERIENCE</h6>
                                <div className="modular-cont">
                                    <div className="work-exp-col">
                                        <h1 className="work-exp-head" >UI/UX DESIGNER / HYPREMIUM</h1>
                                        <h3 className="work-exp-sub" >2018–2019, LOS ANGELES</h3>
                                        <h6 className="work-exp-body">I utilized rapid prototyping with InVision, mocking up transitions and animations while I worked side by side Front End Developers to match exact wireframes and font sizes to the pixel. Throughout the application I created Lottie json animations for on-boarding screens, loading screens and UI assets and during beta testing stages of the app I was able to reach out and speak with users future users of the app.</h6>
                                    </div>
                                    <div className="work-exp-col">
                                        <h1 className="work-exp-head" >WEST COAST CUSTOMS</h1>
                                        <h3 className="work-exp-sub" >2018–2019, LOS ANGELES</h3>
                                        <h6 className="work-exp-body">I have provided assets for sites such as ASAP Rocky’s e-commerce awgeshit.com and continually manage West Coast Customs Ryan Friedlinghaus’ sons CMS web pages providing assets and working closely with Shopify Liquid developers to customize the Shopify sites. Additionally I have been able to work and create EP covers for Billboard 100 musicians and frequently take on brand and identity projects.</h6>
                                    </div>
                                    <div className="work-exp-col">
                                        <h1 className="work-exp-head" >THE JUICE IOS APPLICATION</h1>
                                        <h3 className="work-exp-sub" >2018–2019, LOS ANGELES</h3>
                                        <h6 className="work-exp-body">I utilized rapid prototyping with InVision, mocking up transitions and animations while I worked side by side Front End Developers to match exact wireframes and font sizes to the pixel. Throughout the application I created Lottie json animations for on-boarding screens, loading screens and UI assets and during beta testing stages of the app I was able to reach out and speak with users future users of the app.</h6>
                                    </div>
                                </div>
                        </Col>
                        <Col lg={4}>
                            <h6 className="cv_title">EDUCATION</h6>
                            <div className="modular-cont">
                                <h1 className="work-exp-head" >GRADUATION/ ALBERTA UNIVERSITY OF THE ARTS</h1>
                                <h3 className="work-exp-sub" >2022, CALGARY</h3>
                                <h6 className="work-exp-body">The School of Communication Design (SCD) includes a mandatory completion of 12 major courses, 5 elective courses and 10 liberal studies programs. Admission into the SCD is based off of a combination of GPA and portfolio assessment in junction with the completion of all first year courses. Students must be in a clear academic standing to participate in the program.</h6>
                            </div>
                        </Col>
                    </Row>
                </div>
        </Container>
    )
}

export default LandingPage