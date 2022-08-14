import React from 'react'
import BlogPost from '../components/BlogPost'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import Social from '../components/Social'
import SEO from '../components/SEO'


export default function DriveBlog ({ data, pageContext }) {

  const {
    name: title,
    date,
    childMarkdownRemark: { html, excerpt }
  } = data.googleDocs


  return (<>
    <SEO title={title} description={excerpt}/>
    <Header/>
      <div className='wrapper'>
        <div className="blog">
          <BlogPost
            title={title}
            description={excerpt}
            nav={pageContext}
            post={html}
            date={date}
            author={data.site.siteMetadata.author.name}
            avatar={data.avatar.childImageSharp.fixed}
          />
        </div>
      </div>
    <Social/>
  </>)
}


export const pageQuery = graphql`
  query BlogPost($path: String!) {
    googleDocs( slug: {eq: $path} ) {
      name
      childMarkdownRemark {
        excerpt(pruneLength: 160)
        html
      }
      date(formatString: "MMMM DD, YYYY")
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
