import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../client'

const App = () => {
  const [singlePost, setSinglePost] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      projectTitle,
      companyName,
      projectOverview
    }`)

    .then((data) => setSinglePost(data))
    .catch(console.error)
  },[singlePost])

  return (
    <div>
    {/* <h2>Blog Posts</h2>
    <h3>Welcome to my blog posts page!</h3> */}
    <div>
      {singlePost &&
        singlePost.map((project, index) => (
            <span key={index}>
              <img src={project.mainImage.asset.url} alt={project.projectTitle} style={{ height: "10vh", width: "auto"}} />
              <h6>{project.projectTitle}</h6>
              <span>
                <h2>{project.companyName}</h2>
                {/* <h2>{project.projectOverview}</h2> */}
              </span>
            </span>
        ))}
    </div>
  </div>
  )
}

export default App;