import React, { useState, useEffect, Suspense } from 'react';
import sanityClient from '../client';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { SpotLight, Html } from '@react-three/drei';
import { useTrail, a, useSpring } from 'react-spring';

import NavBar from './Navigation/NavBar';
import NavHead from './Navigation/NavHead';
import Controls from './3D/Controls';
// import Effects from './3D/Effects';
// import Lightmap from './3D/Effects';
import Model from './3D/SignNeon';

import ArrowWhite from '../Assets/proj_arrows_white.svg';

import '../index.css';

function Trail({ open, children, ...props }) {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      height: open ? 110 : 0,
      from: { opacity: 0, x: 20, height: 0 },
    })
    return (
      <div className="trails-main" {...props}>
        <div>
          {trail.map(({ x, height, ...rest }, index) => (
            <a.div
              key={[index]}
              className="trails-text"
              style={{ ...rest, transform: x.to((x) => `translate3d(0,${x}px,0)`) }}>
              <a.div style={{ height }}>{items[index]}</a.div>
            </a.div>
          ))}
        </div>
      </div>
    )
  }

const Home = () => {
    const [hovered, setHovered] = useState(false)
    const [postData, setPostData] = useState(null)
    const [open, setOpen] = useState(false)

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
            role
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
        setOpen(true)
      },[postData])

      const rightMenuAnimation = useSpring({
        opacity: open ? 1 : 0,
        config: {
            duration: 1000
          }
      }); 

      const hoveredAnimation = useSpring({
        transform: hovered ? "rotate(90deg)" : "rotate(0deg)",
        // config: {
        //   }
      }); 

    return (
        <Container fluid>
            <NavHead />

            <div className="container-section">
                    <Row>
                        <Col
                            lg={{ offset: 1, span: 5 }}
                            xs={{ offset: 1, span: 5 }}
                        >
                            <Trail open={open}>
                                <h1 className="nameTitle">Gideon</h1>
                                <h1 className="nameTitle">Chrapko</h1>
                            </Trail>
                        </Col>
                        <Col lg={6} style={{ height: "100vh", right: "0", position: "absolute", marginTop: "-40vh" }}>
                        <Canvas shadows>
                            <color attach="background" args={['white']}/>
                                <Suspense fallback={<Html center>...Loading</Html>}>
                                        {/* <Lightmap/> */}
                                        {/* <pointLight position={[1, 1, 0]} intensity={1} color={'red'} /> */}
                                        <pointLight position={[0, 1, 0]} intensity={1} color={'white'} />
                                        <ambientLight intensity={3} />
                                            <Model position={[0, 1.3, 0]} />
                                        <Controls />
                                        {/* <Effects /> */}
                                </Suspense>
			            </Canvas>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "-10px"}} >
                        <Col
                            lg={{ offset: 1, span: 4 }}
                            xs={{ offset: 1, span: 6 }}
                        >
                            <a.h4 style={rightMenuAnimation} className="subheadTitle">UX & UI CASE STUDY ONLINE</a.h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            lg={{ offset: 1, span: 1 }}
                            md={{ offset: 1, span: 1 }}
                            sm={{ offset: 1, span: 1 }}
                            xs={{ offset: 1, span: 1 }}
                        >
                            <a.h1 style={rightMenuAnimation} className="subheadDate">2021</a.h1>
                        </Col>
                        <Col
                            lg={{ offset: 0, span: 2 }}
                            md={{ offset: 0, span: 2 }}
                            sm={{ offset: 0, span: 2 }}
                            xs={{ offset: 0, span: 3 }}
                        >
                            <a.h6 style={rightMenuAnimation} className="bodyDescrip">I am currently a third year student enrolled in the Alberta University of the Arts in the Bachelor of Design program.</a.h6>
                        </Col>
                        <Col
                            lg={{ offset: 0, span: 2 }}
                            xs={{ offset: 0, span: 3 }}
                        >
                            <a.h6 style={rightMenuAnimation} className="bodyDescrip">I currently am working in UI/UX design and development working with several front end technologies and utilizing javascript frameworks such as Reactjs, Threejs and bootstrap.</a.h6>
                        </Col>
                    </Row>
                </div>

                <div className="container-section">
                    <Row className="gx-3 proj_row" >
                        {postData &&
                        postData.map((project, index) => (
                                <Col 
                                    lg={3} 
                                    className="proj_col" 
                                    key={index}
                                    onPointerOver={() => setHovered(true)}
                                    onPointerOut={() => setHovered(false)}
                                >
                                    <Link to={"/project/" + project.slugRoute.current} className="proj_header">{project.projectTitle}</Link>
                                    {/* <li>{project.role}</li> */}
                                    <img src={project.thumbImage.asset.url} alt={project.slugRoute.current} className="proj_img" />
                                    <a.img 
                                        src={ArrowWhite}   
                                        alt="arrow" 
                                        className="proj_arrow" 
                                        style={hoveredAnimation}
                                        key={index}
                                    />
                                </Col>
                        ))}
                    </Row>
                    <Row className="gx-3 proj_row" >
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom" >
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                    </Row>
                    <Row className="gx-3 proj_row" >
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                        <Col lg={3} className="d-xs-none d-md-none d-none d-lg-block d-md-block proj_col_bottom">
                        </Col>
                    </Row>
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
                <NavBar/>
        </Container>
    )
}

export default Home