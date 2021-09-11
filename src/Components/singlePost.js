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
                <img src={project.mainImage.asset.url} alt={project.projectTitle} style={{ height: "10vh", width: "auto"}} />
                <h1>{project.projectTitle}</h1>
                <h3>{project.sectionTitle}</h3>
                <h3>Company</h3>
                  <h4>{project.companyName}</h4>
                  <BlockContent 
                    blocks={project.projectOverview} 
                    projectId="kjeh3i1n"
                    dataset="production"
                  />
                  <h3>Role</h3>
                  <h4>{project.role}</h4>
                  <h3>Tools</h3>
                  <h4>{project.tools}</h4>
              </span>
          ))}
      </div>
    </div>
    )
}

export default App;