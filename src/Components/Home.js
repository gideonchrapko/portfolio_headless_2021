import React, { useState, useEffect } from 'react'
import sanityClient from '../client'
import { Link } from 'react-router-dom'

const Home = () => {
    const [postData, setPostData] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            mainImage{
                asset->{
                  _id,
                  url
                },
                alt
              },
            slugRoute,
            projectTitle
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
      },[postData])

    return (
        <div>
            <h1>Gideon Chrapko Portfolio</h1>
            <h1>Landing</h1>
            <h1>Projects</h1>
            {postData &&
                postData.map((project, index) => (
                    <span key={index}>
                        <img src={project.mainImage.asset.url} alt={project.slugRoute.current} style={{ height: "10vh", width: "auto"}}/>
                        <Link to={"/project/" + project.slugRoute.current}>{project.projectTitle}</Link>
                    </span>
                 ))}
            <h1>About</h1>
        </div>
    )
}

export default Home