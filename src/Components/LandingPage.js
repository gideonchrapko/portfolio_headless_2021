import React, { useState, useEffect, Suspense } from 'react';
import sanityClient from '../client';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import BlockContent from '@sanity/block-content-to-react';
import { motion } from 'framer-motion';
import { Element} from 'react-scroll';
import ReactGa from 'react-ga'

import Controls from './3D/Controls';
import Model from './3D/SignNeon';
import NavHead from './Navigation/NavHead';
import NavBar from './Navigation/NavBar';

import ArrowWhite from '../Assets/proj_arrows_white.svg';
// import Avatar from '../Assets/1618532615911.jpg';
import '../index.css';

const transition = { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
    initial: {
      y: 20,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };
  
  const lastName = {
    initial: {
      y: 0,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.04,
        staggerDirection: 1,
      },
    },
  };
  
  const letter = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ...transition },
    },
  };

const LandingPage = () => {
    useEffect(() => {
        ReactGa.initialize('UA-241048002-1 ')
        ReactGa.pageview('/')
    },[])

    const [iHovered, setiHovered] = useState(false);
    const [postData, setPostData] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [landingPageData, setLandingPageData] = useState()
    const history = useHistory();

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
            projectOverviewShort,
            role,
            tldrClip{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
      },[])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "landingPage"]{
            BioParagraph1,
            BioParagraph2
        }`)
        .then((data) => setLandingPageData(data))
        .catch(console.error)
      },[])

      const length = postData && postData.length
      const projHeight = 100 / length

      const variants = {
        open: { width: "40vw" },
        closed: { width: "80vw" }
      }

      const variantsRight = {
        first: { width: "40vw" },
        second: { width: "0" }
      }

      const year = new Date().getFullYear();
      const spring = { duration: 1, ease: [0.4, 0.13, 0.23, 0.96]}

    return (
            <motion.div 
                initial='initial'
                animate='animate'
                exit='exit'
            >
            <NavHead/>
            <NavBar/>
            <Container fluid >
                <Element name="about">
                <motion.div 
                    className="container-section child"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >      
                    <Row style={{ paddingTop: "30vh" }}>
                        <Col
                            lg={{ offset: 1, span: 5 }}
                            xs={{ offset: 1, span: 10 }}
                        >
                        <motion.div className='model'>
                            <motion.span className='first' variants={firstName}>
                                <motion.span variants={letter}>G</motion.span>
                                <motion.span variants={letter}>i</motion.span>
                                <motion.span variants={letter}>d</motion.span>
                                <motion.span variants={letter}>e</motion.span>
                                <motion.span variants={letter}>o</motion.span>
                                <motion.span variants={letter}>n</motion.span>
                            </motion.span><br/>
                            <motion.span className='last' variants={lastName}>
                                <motion.span variants={letter}>C</motion.span>
                                <motion.span variants={letter}>h</motion.span>
                                <motion.span variants={letter}>r</motion.span>
                                <motion.span variants={letter}>a</motion.span>
                                <motion.span variants={letter}>p</motion.span>
                                <motion.span variants={letter}>k</motion.span>
                                <motion.span variants={letter}>o</motion.span>
                            </motion.span>
                            </motion.div>
                            </Col>
                            <Col lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                style={{ height: "100vh", right: "0", position: "absolute", marginTop: "-40vh" }}
                            >
                            <Canvas shadows style={{ height: "70vh" }}>
                                <Suspense fallback={<Html center>...Loading</Html>}>
                                    <pointLight position={[0, 1, 0]} intensity={1} color={'white'} />                                
                                    <ambientLight intensity={3} />
                                    <Model />
                                    <Controls />
                                </Suspense>
                            </Canvas>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                lg={{ offset: 1, span: 4 }}
                                xs={{ offset: 1, span: 6 }}
                            >
                                <h4 className="subheadTitle">UX & UI CASE STUDY</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                lg={{ offset: 1, span: 1 }}
                                md={{ offset: 1, span: 1 }}
                                sm={{ offset: 1, span: 1 }}
                                xs={{ offset: 1, span: 1 }}
                            >
                                <h1 className="subheadDate">{year}</h1>
                            </Col>
                            <Col
                                lg={{ offset: 0, span: 2 }}
                                md={{ offset: 0, span: 2 }}
                                sm={{ offset: 0, span: 2 }}
                                xs={{ offset: 0, span: 3 }}
                            >
                                <h6 className="bodyDescrip">
                                    <BlockContent 
                                        blocks={landingPageData && landingPageData[0].BioParagraph1}
                                        projectId="kjeh3i1n"
                                        dataset="production"
                                    />
                                </h6>
                            </Col>
                            <Col
                                lg={{ offset: 0, span: 2 }}
                                xs={{ offset: 0, span: 3 }}
                            >
                                <h6 className="bodyDescrip">
                                    <BlockContent 
                                        blocks={landingPageData && landingPageData[0].BioParagraph2}
                                        projectId="kjeh3i1n"
                                        dataset="production"
                                    />                           
                                </h6>
                            </Col>
                        </Row>
                    </motion.div>
                </Element>

                <Element className="container-section child" style={{ paddingTop: "15vh" }} name="projects">
                    <div 
                        //this is supposed to be the container for all mapped divs
                        onMouseLeave={() => setiHovered(false)} 
                        style={{ height: "70vh", width: "80vw", marginLeft: "10vw", display: "inline-block" }}
                    >
                        {postData &&
                        postData.map((project, index) => (
                            <motion.div 
                                className="gx-3 proj_row row" 
                                onMouseEnter={e => {
                                    setiHovered(index)
                                    setImgSrc(project.mainImage && project.tldrClip.asset.url)
                                }}
                                animate={iHovered !== false ? "open" : "closed"}
                                variants={variants}
                                transition={spring}
                                style={{
                                    backgroundColor: iHovered === index ? "#0AFF00" : "#BAFF00",
                                    height: `${projHeight}%`,
                                    marginLeft: "0pt",
                                    width: "100%",
                                }}
                                key={index}
                                onClick={() => history.push(`project/${project.slugRoute && project.slugRoute.current}`)}
                            >
                                <Col lg={1} className="proj_col" >
                                    <img 
                                        src={project.thumbImage && project.thumbImage.asset.url} 
                                        alt={project.slugRoute && project.slugRoute.current} 
                                        className="proj_img_thumb d-xs-none d-none d-lg-block d-md-block"
                                    />
                                </Col>
                                <Col lg={2} xs={4} className="proj_col" >
                                    <h1 className="proj_header">{project.projectTitle && project.projectTitle}</h1>
                                </Col>
                                <Col lg={iHovered !== false ? 6 : 4} className="proj_description d-xs-none d-none d-lg-block d-md-block">
                                    {index === iHovered ? 
                                    <h1 className="proj_view_text">View Project</h1>
                                        : 
                                    <h6 className='proj-overview-text'>
                                        {/* <BlockContent 
                                            blocks={project.projectOverviewShort}
                                            projectId="kjeh3i1n"
                                            dataset="production"
                                        /> */}
                                    </h6>
                                    // <h1 className="proj_header">{project.projectTitle && project.projectTitle}</h1>
                                    }
                                </Col>
                                <Col lg={iHovered !== false ? 3 : 5} xs={8} className="proj_col" style={{ height: "100%" }}>
                                    {iHovered !== false ?
                                        null :
                                        <div style={{ backgroundImage: `url(${project.mainImage.asset.url})` }}
                                            alt={`"${project.slugRoute.current} image"`} className="proj_mainImage"
                                        >
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
                            style={{ float: "right", top: "-100%" }}
                        >
                            <div 
                                style={{ backgroundImage: `url(${imgSrc})` }}
                                alt={`"${imgSrc} image"`}
                                className="roj_row_img_anim"
                            >
                            </div>
                        </motion.div>
                    </div>
                </Element>

                <Element className="container-section conatiner-cv child" name="cv" >
                    <Row className="gx-3">
                        <Col lg={{ span: 5, offset: 1 }}>
                            <h6 className="cv_title">CONTACT</h6>
                            <div className="modular-cont">
                                <h1 className="cv-contact">contact@gideonchrapko.me</h1>
                             </div>
                        </Col>
                        <Col lg={1} xs={3}>
                                <h6 className="cv_title">YEARS ACTIVE</h6>
                                <div className="modular-cont">
                                    <h1 className="cv-ya">4</h1>
                                </div>
                        </Col>
                        <Col lg={4} xs={9}>
                                <h6 className="cv_title">RECOGNITIONS</h6>
                                <div className="modular-cont">
                                    <h1 className="work-exp-head">SANDHU PUBLISHING</h1>
                                    <h3 className="work-exp-sub">2022, CALGARY</h3>
                                    <h6 className="work-exp-body">Works featured in "My Graphic DNA" as well as "Geo Graphics".</h6>
                                </div>
                        </Col>
                    </Row>
                    <Row className="gx-3" style={{ paddingTop: "3vh" }}>
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
                                        <h3 className="work-exp-sub" >2020-PRESENT, REMOTE</h3>
                                        <h6 className="work-exp-body">I have provided assets for sites such as ASAP Rocky’s e-commerce awgeshit.com and continually manage West Coast Customs Ryan Friedlinghaus’ sons CMS web pages providing assets and working closely with Shopify Liquid developers to customize the Shopify sites. Additionally I have been able to work and create EP covers for Billboard 100 musicians and frequently take on brand and identity projects.</h6>
                                    </div>
                                    <div className="work-exp-col">
                                        <h1 className="work-exp-head" >THE JUICE IOS APPLICATION</h1>
                                        <h3 className="work-exp-sub" >2020–2021, REMOTE</h3>
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
                </Element>
        </Container>
        </motion.div>
    )
}

export default LandingPage