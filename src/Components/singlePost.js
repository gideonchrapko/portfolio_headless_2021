import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react'

const App = () => {
  const [singlePost, setSinglePost] = useState(null)
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

  return (
    <div>
      <div>
        {singlePost &&
          singlePost.map((project, index) => (
              <span key={index}>
                <img src={project.mainImage.asset.url} alt={project.projectTitle} style={{ height: "auto", width: "80%" }} />
                <h1>{project.projectTitle}</h1>
                <h3>{project.sectionTitle[0]}</h3>
                <h3>Company</h3>
                  <h4>{project.companyName}</h4>
                  <BlockContent 
                    blocks={project.projectOverview} 
                    projectId="kjeh3i1n"
                    dataset="production"
                  />
                  <h3>Role</h3>
                  {project.role &&
                    project.role.map((index) => (
                    <li key={index}>{index}</li>
                  ))}
                  <h3>Tools</h3>
                  {project.tools &&
                    project.tools.map((index) => (
                    <li key={index}>{index}</li>
                  ))}
                  <h3>{project.sectionTitle[1]}</h3>
                  <h3>{project.sectionTitle[2]}</h3>
                  <h4></h4>
                  {project.personaImage1 ? 
                    <img 
                    src={project.personaImage1.asset.url} 
                    alt={project.projectTitle} 
                    style={{ height: "70vh", width: "auto"}} 
                    />                  
                    :
                    <span></span>
                  }
                  {project.personaImage2 ? 
                    <img 
                    src={project.personaImage2.asset.url} 
                    alt={project.projectTitle} 
                    style={{ height: "70vh", width: "auto"}} 
                    />                  
                    :
                    <span></span>
                  }
                  {project.personaImage3 ? 
                    <img 
                    src={project.personaImage3.asset.url} 
                    alt={project.projectTitle} 
                    style={{ height: "70vh", width: "auto"}} 
                    />                  
                    :
                    <span></span>
                  }                                    
                  <h3>{project.sectionTitle[3]}</h3>
                  <h4>Experience Map</h4>
                  <BlockContent 
                    blocks={project.experienceMapOverview} 
                    projectId="kjeh3i1n"
                    dataset="production"
                  />
                  {project.experienceMap ? 
                    <img 
                    src={project.experienceMap.asset.url} 
                    alt={project.projectTitle} 
                    style={{ height: "70vh", width: "auto"}} 
                    />                  
                    :
                    <span></span>
                  }          
                  <h3>{project.sectionTitle[4]}</h3>
                  <h3>{project.sectionTitle[5]}</h3>
                  <h3>{project.sectionTitle[6]}</h3>
                  <h3>{project.sectionTitle[7]}</h3>
                  <h3>{project.sectionTitle[8]}</h3>
                  <h3>{project.sectionTitle[9]}</h3>
              </span>
          ))}
      </div>
    </div>
    )
}

export default App;