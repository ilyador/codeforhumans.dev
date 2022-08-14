import React from 'react'
import { graphql } from 'gatsby'
import Image from "gatsby-image"
import Header from '../components/Header'
import Social from '../components/Social'
import SEO from '../components/SEO'
import 'modern-css-reset'
import '../styles/content.scss'


export default function IndexPage ({ data }) {
  const { html } = data.googleDocs.childMarkdownRemark
  const avatar = data.avatar.childImageSharp.fluid
  const { author } = data.site.siteMetadata

  return (<>
    <SEO title='About'/>
    <Header/>
    <div className='wrapper'>
      <div className="blog">
        <article>
          <header>
            <h1>About Me</h1>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }}/>
          <div className='profile'>
            <Image
              fluid={avatar}
              alt={author.name} />
          </div>
        </article>
      </div>
    </div>
    <Social/>
  </>)
}


export const pageQuery = graphql`
  query AboutPage {
    googleDocs(slug: {eq: "/about"}) {
      childMarkdownRemark {
        html
      }
    }
    avatar: file(absolutePath: { regex: "/about.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 620, quality: 100) {
          ...GatsbyImageSharpFluid
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