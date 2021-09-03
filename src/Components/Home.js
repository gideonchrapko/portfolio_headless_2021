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
            slug,
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
      },[postData])

    return (
        <div>
            <h1>Landing</h1>
            <h1>Projects</h1>
            {postData &&
                postData.map((project, index) => (
                    <span key={index}>
                        <img src={project.mainImage.asset.url} alt={project.slug.current} style={{ height: "10vh", width: "auto"}}/>
                        <Link to={"/project/" + project.slug.current}>{project.slug.current}</Link>
                    </span>
                 ))}
            <h1>About</h1>
        </div>
    )
}

export default Home