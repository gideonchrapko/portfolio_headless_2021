import React, { useEffect, useState } from 'react'
import sanityClient from './client'

const App = () => {
  const [postData, setPostData] = useState(null)

  useEffect(() => {
    sanityClient.fetch(`*[_type == "post"]{
      title,
      slug,
      mainImage{
          asset->{
            _id,
            url
          },
          alt
      }
    }`)
    .then((data) => setPostData(data))
    .catch(console.error)
  },[postData])

  return (
    <div>
    {/* <h2>Blog Posts</h2>
    <h3>Welcome to my blog posts page!</h3> */}
    <div>
      {postData &&
        postData.map((post, index) => (
            <span key={index}>
              <img src={post.mainImage.asset.url} alt="" />
              <h6>{post.slug.current}</h6>
              <span>
                <h2>{post.title}</h2>
              </span>
            </span>
        ))}
    </div>
  </div>
  )
}

export default App;