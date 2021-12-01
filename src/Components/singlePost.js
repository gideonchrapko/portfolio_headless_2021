import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';
import { Container, Col, Row } from 'react-bootstrap';
import {motion} from 'framer-motion';

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slugRoute } = useParams()

  useEffect(() => {
    sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"]{
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      projectTitle,
      sectionTitle,
      companyName,
      projectOverview,
      role,
      tools,
      personaImage1{
        asset->{
          _id,
          url
        },
        alt
      },
      personaImage2{
        asset->{
          _id,
          url
        },
        alt
      },
      personaImage3{
        asset->{
          _id,
          url
        },
        alt
      },
      experienceMapOverview,
      experienceMap{
        asset->{
          _id,
          url
        },
        alt
      },
    }`)

    .then((data) => setSinglePost(data))
    .catch(console.error)
  },[singlePost])

  console.log("fuxk")

  return (
      <Container fluid>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-section-project">
        {singlePost &&
          singlePost.map((project, index) => (
              <span key={index}>
                <Row>
                  <Col lg={{ span: 10, offset: 1 }}>
                    <div 
                      style={{ backgroundImage: `url(${project.mainImage.asset.url})` }}
                      alt={project.projectTitle} 
                      className="sing_proj_headerimg"
                    >
                      <h1 className="sing_proj_headerTitle">{project.projectTitle}</h1>
                    </div>
                  </Col>
                </Row>
                <Row>
                   <Col lg={{ span: 10, offset: 1}}>
                     <h1 className="sing-proj-head">{project.sectionTitle[0]}</h1>
                  </Col>
                </Row>
                <Row className="gx-3">
                      <Col lg={{ span: 2, offset: 1 }}>
                          <h6 className="cv_title">ROLE</h6>
                          <div className="modular-cont">
                          {project.role &&
                              project.role.map((index) => (
                              <li key={index}>{index}</li>
                            ))}
                            </div>
                       </Col>
                      <Col lg={2}>
                              <h6 className="cv_title">TOOLS</h6>
                              <div className="modular-cont">
                               {project.tools &&
                                  project.tools.map((index) => (
                                  <li key={index}>{index}</li>
                                ))}
                               </div>
                       </Col>
                       <Col lg={6}>
                         <h6 className="cv_title">PROJECT OVERVIEW</h6>
                          <div className="modular-cont">
                             <BlockContent 
                                blocks={project.projectOverview} 
                                projectId="kjeh3i1n"
                                dataset="production"
                             />
                          </div>
                       </Col>
                  </Row>
                  <Row>
                    <Col lg={{ span: 10, offset: 1}}>
                      <h1 className="sing-proj-head ">{project.sectionTitle[1]}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={{ span: 10, offset: 1}}>
                       <h1 className="sing-proj-head ">{project.sectionTitle[2]}</h1>
                     </Col>
                  </Row>
                  <Row className="gx-3">
                        <Col lg={{ span: 10, offset: 1 }}>
                             <div className="modular-cont">
                               <BlockContent 
                                  blocks={project.experienceMapOverview} 
                                  projectId="kjeh3i1n"
                                  dataset="production"
                                 />
                             </div>
                         </Col>
                     </Row>
                     <Row>
                       <Col lg={{ span: 10, offset: 1 }}>
                         {project.personaImage1 ? 
                             <img 
                              src={project.personaImage1.asset.url} 
                              alt={project.projectTitle} 
                              className="sing_proj_persona"
                              style={{ height: "auto", width: "26.7vw"}} 
                             />                  
                             :
                             <span></span>
                           }
                           {project.personaImage2 ? 
                             <img 
                              src={project.personaImage2.asset.url} 
                              alt={project.projectTitle} 
                              className="sing_proj_persona"
                              style={{ height: "auto", width: "26.7vw"}} 
                             />                  
                             :
                             <span></span>
                          }
                          {project.personaImage3 ? 
                             <img 
                              src={project.personaImage3.asset.url} 
                              alt={project.projectTitle} 
                              className="sing_proj_persona"
                              style={{ height: "auto", width: "26.7vw"}} 
                             />                  
                             :
                             <span></span>
                          }  
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={{ span: 10, offset: 1}}>
                      <h1 className="sing-proj-head ">{project.sectionTitle[3]}</h1>
                      </Col>
                    </Row>
                    <Row className="gx-3">
                          <Col lg={{ span: 10, offset: 1 }}>
                              <div className="modular-cont">
                                <BlockContent 
                                    blocks={project.experienceMapOverview} 
                                    projectId="kjeh3i1n"
                                    dataset="production"
                                  />
                              </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg={{ span: 10, }}>
                        </Col>
                      </Row>
                  <h3>{project.sectionTitle[4]}</h3>
                  <h3>{project.sectionTitle[5]}</h3>
                  <h3>{project.sectionTitle[6]}</h3>
                  <h3>{project.sectionTitle[7]}</h3>
                  <h3>{project.sectionTitle[8]}</h3>
                  <h3>{project.sectionTitle[9]}</h3>
              </span>
          ))}
          </motion.div>
      </Container>
    )
}

export default SinglePost;