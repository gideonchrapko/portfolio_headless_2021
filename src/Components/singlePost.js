import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url'
import { Container, Col, Row } from 'react-bootstrap';
import {motion} from 'framer-motion';

import NavHead from './Navigation/NavHead';
import NavBar from './Navigation/NavBar';

import closeModal from '../Assets/closeModal.svg'
import Arrow from '../Assets/Arrow.svg'

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slugRoute } = useParams();
  const [tldr, setTldr] = useState(false);
  const [postData, setPostData] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [modalIndex, setModalIndex] = useState(1);
  const [indexHov, setIndexHov] = useState();
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState(0)
  const indexLength = modalImage && modalImage.length - 1

  const builder = imageUrlBuilder(sanityClient)

  function urlFor(source) {
    return builder.image(source)
  }

  useEffect(() => {
    sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"]{
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
      projectTitle,
      sectionTitle,
      companyName,
      projectOverview,
      role,
      tools,
      section1,
      section1Images,
      section2,
      section2Images,
      section3,
      section3Images,
      section4,
      section4Images,
      section5,
      section5Images,
      section6,
      section6Images,
      section7,
      section7Images,
      section8,
      section8Images,
     }`)
    .then((data) => setSinglePost(data))
    .catch(console.error)
  },[])

  useEffect(() => {
    sanityClient.fetch(`*[_type == "project"]{
        slugRoute,
        projectTitle,
    }`)
    .then((data) => setPostData(data))
    .catch(console.error)
  },[])

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Escape') {
        event.preventDefault();
        setPreviewModal(false)
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

    function leftModalImage() {
      const modalImgLength = modalImage.length
      if(modalIndex === 1){
        setModalIndex(modalImgLength - 1)
      } else {
        setModalIndex(modalIndex - 1)
      }
    }

    function rightModalImage() {
      const modalImgLength = modalImage.length
      if(modalIndex === modalImgLength - 1){
        setModalIndex(1)
      } else {
        setModalIndex( modalIndex + 1)
      }
    }

  return (
      <Container>
        <NavHead />
        <NavBar 
          slugRoute={slugRoute} 
          postData={postData}
        />
        { previewModal ?
          <div className='modal-div'>
            <img 
              src={closeModal} 
              alt='close modal window' 
              onClick={() => setPreviewModal(false)}
              className='close-modal'
            />
            {modalImage.length <= 2 ?
                <img src={urlFor(modalImage[1]).url()} className="modal-image"/>
              :
              <>
                <img src={Arrow} className='modal-arrow-right' onClick={() => rightModalImage()} />
                <img src={Arrow} className='modal-arrow-left' onClick={() => leftModalImage()} />
                <img src={urlFor(modalImage[modalIndex]).url()} className="modal-image"/>
                <h1 className='modal-page-text' >{`${modalIndex} / ${indexLength}`}</h1>
              </>
            } 
            <div className='backgroundDiv' onClick={() => setPreviewModal(false)}>
            </div>
          </div>
          :
          <span></span>
        }
        <div className="container-section-project">
        {singlePost &&
          singlePost.map((project, index) => (
              <span key={index}>
                <Row>
                  <Col lg={{ span: 1 }} style={{ position: "fixed", left: "0", width: '12%' }} className='d-xs-none d-md-none d-none d-lg-block'>
                    {project &&
                      project.sectionTitle.map((index, i) => {
                        const indexShorthand = index.length > 10 ? index.substr(0, 20-1) + '...' : index;
                        return (
                          <div key={i}>
                            <span
                              style={{ backgroundColor: `${section === i ? 'red' : indexHov === i ? "red" : "white" }` }}
                              className="dot"></span>
                            <span
                              style={{ 
                                // fontWeight: `${indexHov === i ? "500" : "300"}`,
                                fontWeight: `${section === i ? 500 : indexHov === i ? "500" : "300" }`,
                                color: `${section === i ? 'black' : indexHov === i ? "black" : "rgba(167, 167, 167, 0.9)"}`
                               }}
                              onClick={() => setSection(i)}
                              onPointerOver={() => setIndexHov(i)}
                              onPointerOut={() => setIndexHov()}
                              className='sing-prod-index'
                            >
                                {indexShorthand}
                            </span>
                          </div>
                        )
                    })
                    }
                  </Col>
                  <Col lg={{ span: 10, offset: 1 }}>
                    <div
                      style={{ backgroundImage: `url(${project.mainImage.asset.url})` }}
                      alt={project.projectTitle} 
                      className="sing_proj_headerimg"
                    >
                      <h1 className="sing_proj_headerTitle">{project.projectTitle}</h1>
                      <img src={project.thumbImage.asset.url} alt={`${project.projectTitle} logo`} className="sing-proj-thumb" />
                    </div>
                  </Col>
                  {/* <Col lg={{ span: 1 }}>
                    <div style={{ background: `${ tldr ? "white" : "#00E4B6" }`, border: `${ tldr ? "5px solid #00E4B6" : "" }`, transform: `translateX(${hover ? "-10px" : "15px"})` }}
                      onClick={() => setTldr(!tldr)} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} className='tldr-div'
                    >
                      <h1 style={{ fontWeight: "800", color: `${ tldr ? "#00E4B6" : "white" }`, WebkitTransform: "rotate(-90deg)", marginRight: "100px", marginTop: "100px" }}>TLDR</h1>
                    </div>
                  </Col> */}
                </Row>
                <Row>
                   <Col lg={{ span: 10, offset: 1}} style={{ marginTop: "0" }}>
                     <h1 className="sing-proj-head">{project.sectionTitle[0]}</h1>
                  </Col>
                </Row>
                <Row className="gx-3">
                      <Col lg={{ span: 2, offset: 1 }} xs={6}>
                          <h6 className="cv_title">ROLE</h6>
                          <div className="sing-proj-modular-cont" style={{ paddingBottom: "5vw", paddingLeft: "15px" }}>
                          {project.role &&
                              project.role.map((index) => (
                              <li key={index}>{index}</li>
                            ))}
                            </div>
                       </Col>
                      <Col lg={2} xs={6}>
                              <h6 className="cv_title">TOOLS</h6>
                              <div className="sing-proj-modular-cont" style={{ paddingBottom: "5vw", paddingLeft: "15px" }}>
                               {project.tools &&
                                  project.tools.map((index) => (
                                  <li key={index}>{index}</li>
                                ))}
                               </div>
                       </Col>
                       <Col lg={6}>
                         <h6 className="cv_title">PROJECT OVERVIEW</h6>
                          <div className="sing-proj-modular-cont" style={{ paddingBottom: "5vw" }}>
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
                      <h1 className="sing-proj-head">{project.sectionTitle[1]}</h1>
                    </Col>
                  </Row>
                  <Row className="gx-3">
                        <Col lg={{ span: 10, offset: 1 }}>
                             <div className="sing-proj-modular-cont">
                               <BlockContent 
                                  blocks={project.section1} 
                                  projectId="kjeh3i1n"
                                  dataset="production"
                                 />
                             </div>
                         </Col>
                     </Row>
                  <Row>
                  <Row>
                      <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                        {project.section1Images ?
                                <img 
                                  onClick={e => {
                                    setPreviewModal(true)
                                    setModalImage(project.section1Images)
                                  }}
                                  src={urlFor(project.section1Images[0].asset).url()}
                                  className="sing_proj_img"
                                  alt={`${project.sectionTitle[1]} images`}
                                  style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                                />           
                             :
                             <span></span>
                          }  
                        </Col>
                    </Row>
                    <Col lg={{ span: 10, offset: 1}}>
                       <h1 className="sing-proj-head ">{project.sectionTitle[2]}</h1>
                     </Col>
                  </Row>
                  <Row className="gx-3">
                        <Col lg={{ span: 10, offset: 1 }}>
                             <div className="sing-proj-modular-cont">
                               <BlockContent 
                                  blocks={project.section2} 
                                  projectId="kjeh3i1n"
                                  dataset="production"
                                 />
                             </div>
                         </Col>
                     </Row>
                     <Row>
                       <Col lg={{ span: 10, offset: 1 }} style={{ textAlign: "center" }}>
                         {project.section2Images ? 
                              <img 
                                onClick={e => {
                                  setPreviewModal(true)
                                  setModalImage(project.section2Images)
                                }}
                                src={urlFor(project.section2Images[0].asset).url()} 
                                alt={`${project.sectionTitle[2]} images`}
                                className="sing_proj_img"
                                style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
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
                              <div className="sing-proj-modular-cont">
                                <BlockContent 
                                    blocks={project.section3} 
                                    projectId="kjeh3i1n"
                                    dataset="production"
                                  />
                              </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                        {project.section3Images ? 
                              <img 
                                onClick={e => {
                                  setPreviewModal(true)
                                  setModalImage(project.section3Images)
                                }}
                                src={urlFor(project.section3Images[0].asset).url()} 
                                alt={`${project.sectionTitle[3]} images`}
                                className="sing_proj_img"
                                style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                              />                
                             :
                             <span></span>
                           }
                        </Col>
                    </Row>
                    <Row>
                      <Col lg={{ span: 10, offset: 1}}>
                        <h1 className="sing-proj-head">{project.sectionTitle[4]}</h1>
                      </Col>
                    </Row>
                      <Row className="gx-3">
                          <Col lg={{ span: 10, offset: 1 }}>
                              <div className="sing-proj-modular-cont">
                                <BlockContent 
                                    blocks={project.section4} 
                                    projectId="kjeh3i1n"
                                    dataset="production"
                                  />
                              </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                        {project.section4Images ? 
                              <img 
                                onClick={e => {
                                  setPreviewModal(true)
                                  setModalImage(project.section4Images)
                                }}
                                src={urlFor(project.section4Images[0].asset).url()} 
                                alt={`${project.sectionTitle[4]} images`}
                                className="sing_proj_img"
                                style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                              />                
                             :
                             <span></span>
                           }
                        </Col>
                    </Row>
                      <Row>
                        <Col lg={{ span: 10, offset: 1}}>
                          <h1 className="sing-proj-head">{project.sectionTitle[5]}</h1>
                        </Col>
                      </Row>
                      <Row className="gx-3">
                          <Col lg={{ span: 10, offset: 1 }}>
                              <div className="sing-proj-modular-cont">
                                <BlockContent 
                                    blocks={project.section5} 
                                    projectId="kjeh3i1n"
                                    dataset="production"
                                  />
                              </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                        {project.section5Images ? 
                              <img 
                                onClick={e => {
                                  setPreviewModal(true)
                                  setModalImage(project.section5Images)
                                }}
                                src={urlFor(project.section5Images[0].asset).url()} 
                                alt={`${project.sectionTitle[5]} images`}
                                className="sing_proj_img"
                                style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                              />                
                             :
                             <span></span>
                           }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 10, offset: 1}}>
                          <h1 className="sing-proj-head">{project.sectionTitle[6]}</h1>
                        </Col>
                      </Row>
                      <Row className="gx-3">
                          <Col lg={{ span: 10, offset: 1 }}>
                              <div className="sing-proj-modular-cont">
                                <BlockContent 
                                    blocks={project.section6} 
                                    projectId="kjeh3i1n"
                                    dataset="production"
                                  />
                              </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                        {project.section6Images ? 
                              <img
                                onClick={e => {
                                  setPreviewModal(true)
                                  setModalImage(project.section6Images)
                                }}
                                src={urlFor(project.section6Images[0].asset).url()} 
                                alt={`${project.sectionTitle[6]} images`}
                                className="sing_proj_img"
                                style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                              />                
                             :
                             <span></span>
                           }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 10, offset: 1}}>
                          <h1 className="sing-proj-head">{project.sectionTitle[7]}</h1>
                        </Col>
                    </Row>
                    <Row className="gx-3">
                         <Col lg={{ span: 10, offset: 1 }}>
                            <div className="sing-proj-modular-cont">
                              <BlockContent 
                                   blocks={project.section7} 
                                  projectId="kjeh3i1n"
                                   dataset="production"
                                 />
                            </div>
                         </Col>
                    </Row>
                    <Row>
                      <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center", paddingBottom: "20vh" }}>
                      {project.section7Images ? 
                             <img 
                              onClick={e => {
                                setPreviewModal(true)
                                setModalImage(project.section7Images)
                               }}
                              src={urlFor(project.section7Images[0].asset).url()} 
                               alt={`${project.sectionTitle[7]} images`}
                               className="sing_proj_img"
                               style={{ width: `${window.innerWidth > 600 ? "60%" : "80%" }` }}
                            />                
                            :
                            <span></span>
                          }
                      </Col>
                    </Row>
                  {/* <h3>{project.sectionTitle[8]}</h3>
                  <h3>{project.sectionTitle[9]}</h3> */}
              </span>
          ))}
          </div>
      </Container>
    )
}

export default SinglePost;