import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url'
import { Container, Col, Row } from 'react-bootstrap';
// import {motion} from 'framer-motion';

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
  const [modalImage, setModalImage] = useState(1);
  const [modalIndex, setModalIndex] = useState(1);
  const [indexLength, setIndexLength] = useState();
  const [indexHov, setIndexHov] = useState();
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState(0)
  // const indexLength = singlePost && singlePost[0].sectionContent[modalImage].sectionImages.length - 1
  const builder = imageUrlBuilder(sanityClient)
  const mobileView = window.innerWidth < 600

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
      tldrClip{
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
      sectionContent,
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
    const modalImgLength = singlePost[0].sectionContent[modalImage].sectionImages.length
     if(modalIndex === 1){
       setModalIndex(modalImgLength - 1)
    } else {
       setModalIndex(modalIndex - 1)
    }
  }

  function rightModalImage() {
    const modalImgLength = singlePost[0].sectionContent[modalImage].sectionImages.length
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
        {previewModal ?
          <div className='modal-div'>
            <img 
              src={closeModal} 
              alt='close modal window' 
              onClick={() => setPreviewModal(false)}
              className='close-modal'
            />
            {singlePost[0].sectionContent[modalImage].sectionImages.length <= 2 ?
              <div 
                className='modalImage-size'
                style={{ backgroundImage: `url(${urlFor(singlePost[0].sectionContent[modalImage].sectionImages[1].asset).url()})` }}>
              </div>
              :
              <>
                <div className='modalImage-size' style={{ backgroundImage: `url(${urlFor(singlePost[0].sectionContent[modalImage].sectionImages[modalIndex].asset).url()})`}} >
                </div>
                <img alt="View Next" src={Arrow} className='modal-arrow-right' onClick={() => rightModalImage()} />
                <img alt='View Previous' src={Arrow} className='modal-arrow-left' onClick={() => leftModalImage()} />
                <h1 className='modal-page-text' >{`${modalIndex} / ${indexLength}`}</h1>
              </>
            } 
            <div className='backgroundDiv' onClick={() => setPreviewModal(false)}>
            </div>
          </div>
          :
          <span></span>
        }
        <div className="container-section-project" style={{ marginBottom: "20vh" }}>
        {singlePost &&
          singlePost.map((project, index) => (
              <span key={index}>
                <Row>
                  
                  {/* <Col lg={{ span: 1 }} style={{ position: "fixed", left: "0", width: '12%' }} className='d-xs-none d-md-none d-none d-lg-block'>
                    {project && !tldr &&
                      project.sectionTitle.map((index, i) => {
                        const indexShorthand = index.length > 10 ? index.substr(0, 20-1) + '...' : index;
                        return (
                          <div key={i}>
                            <span style={{ backgroundColor: `${section === i ? 'red' : indexHov === i ? "red" : "white" }` }}
                              className="dot">
                            </span>
                            <span style={{ fontWeight: `${section === i ? 500 : indexHov === i ? "500" : "300" }`,
                                color: `${section === i ? 'black' : indexHov === i ? "black" : "rgba(167, 167, 167, 0.9)"}`
                               }}
                              onClick={() => setSection(i)} onPointerOver={() => setIndexHov(i)} onPointerOut={() => setIndexHov()}
                              className='sing-prod-index'
                            >
                                {indexShorthand}
                            </span>
                          </div>
                        )
                      })
                    }
                  </Col> */}
                  
                  <Col lg={{ span: 10, offset: 1 }}>
                    <div style={{ height: "100%", width: `${tldr ? "50%" : "0%" }`, float: "left", transition: "width ease-in-out 0.5s" }} >
                      <h1 className='tldr-project-title' >{tldr ? project.projectTitle : ""}</h1>
                      <div className="sing-proj-modular-tldr" style={{ width: "100%", textAlign: "right" }}>
                        <h6><a href="https://wccdrops.com/" style={{ color: "black" }}>{tldr ? "View Site" : ""}</a></h6>
                      </div>
                    </div>
                    <div
                      style={{ 
                        backgroundImage: `url(${ project.mainImage.asset.url })`, 
                        width: `${ tldr ? "50%" : "100%" }`, height: `${ tldr ? "15vh" : "40vh" }`
                      }} 
                      alt={project.projectTitle} className="sing_proj_headerimg" 
                    >
                      <h1 className="sing_proj_headerTitle">{!tldr ? project.projectTitle : "" }</h1>
                      {!tldr ?
                        <img src={project.thumbImage.asset.url} alt={`${project.projectTitle} logo`} className="sing-proj-thumb" />
                        :
                        <span></span>
                       }
                    </div>
                    {tldr ?
                      <div style={{ backgroundImage: `url(${project.tldrClip.asset.url})` }} className='tldr-image'>
                      </div>
                      :
                      <span></span>                    
                    }
                  </Col>

                  <Col lg={{ span: 1 }} style={{ position: "fixed", zIndex: "99" }}>
                    {mobileView ?
                      <div
                        className='tldr-div-mobile'
                        style={{ background: `${ tldr ? "transparent" : "#00E4B6" }`, border: `${ tldr ? "2px solid #00E4B6" : "" }` }}
                        onClick={() => setTldr(!tldr)} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}
                      >
                        <h1 style={{ color: `${ tldr ? "#00E4B6" : "white" }` }} className="tldr-font-mobile">TLDR</h1>
                      </div>
                      :
                      <div style={{ background: `${ tldr ? "white" : "#00E4B6" }`, border: `${ tldr ? "5px solid #00E4B6" : "" }`, transform: `translateX(${hover ? "20px" : "30px"})` }}
                        onClick={() => setTldr(!tldr)} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} className='tldr-div'
                      >
                        <h1 style={{ color: `${ tldr ? "#00E4B6" : "white" }`, WebkitTransform: "rotate(-90deg)" }} className="tldr-font">TLDR</h1>
                      </div>
                    }
                  </Col>
                  
                </Row>
                {!tldr ?
                  <>
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
                    </>
                    :
                    <span></span>
                  }
                  {project && !tldr && 
                    project.sectionContent.map((proj, i) => (
                      <span key={i}>
                        <Row>
                          <Col lg={{ span: 10, offset: 1}}>
                            <h1 className="sing-proj-head">{project.sectionTitle[i + 1]}</h1>
                          </Col>
                        </Row>
                        <Row className="gx-3">
                          <Col lg={{ span: 10, offset: 1 }}>
                             <div className="sing-proj-modular-cont">
                               <BlockContent 
                                  blocks={proj.sectionBlock} 
                                  projectId="kjeh3i1n"
                                  dataset="production"
                                 />
                             </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={{ span: 10, offset: 1}} style={{ textAlign: "center" }}>
                            {proj.sectionImages ?
                                    <>
                                    <img 
                                      onClick={e => {
                                        setPreviewModal(true)
                                        setModalImage(i)
                                        setIndexLength(singlePost[0].sectionContent[i].sectionImages.length - 1)
                                      }}
                                      src={urlFor(proj.sectionImages[0].asset).url()}
                                      className="sing_proj_img"
                                      alt={`${project.sectionTitle[i + 1]} images`}
                                      style={{ width: `${mobileView ? "80%" : "60%" }` }}
                                    />
                                    <h6>Click for details</h6>
                                    </>
                                :
                                <span></span>
                              }  
                          </Col>
                        </Row>
                      </span>
                    ))
                  }
              </span>
          ))}
          </div>
      </Container>
    )
}

export default SinglePost;