import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import SignUp from '../components/SignUp'
import Header from '../components/Header'
import Social from '../components/Social'
import SEO from '../components/SEO'


export default function Mentorship ({ data, specialPrice }) {
  const reviews = data.allGoogleDocs.nodes.find(node => node.name === 'Reviews')
  const avatar = data.avatar.childImageSharp.fluid
  const { author } = data.site.siteMetadata


  return (
    <>
      <SEO title='Sign Up!'/>
      <Header/>
      <div className='wrapper'>
        <div className="blog">
          <article id='signup'>
            <header>
              <h1>Sign Up & Start Today!</h1>
            </header>
            <SignUp specialPrice={specialPrice}/>
          </article>
          <article id='video'>
            <div className='youtubeEmbed'>
              <iframe
                src='https://www.youtube.com/embed/O3buP5k8SNY'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen>
              </iframe>
            </div>
          </article>
          <article id='reviews' className="reviews">
            <header>
              <h1>Client Reviews</h1>
            </header>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: reviews.childMarkdownRemark.html }}
            />
            <div className='profile'>
              <Image
                fluid={avatar}
                alt={author.name}/>
            </div>
          </article>
        </div>
      </div>
      <Social/>
    </>
  )
}


export const pageQuery = graphql`
    query Mentorship {
        allGoogleDocs(
            filter:{path: {regex: "/mentorship/"}}
            sort: {fields: [createdTime], order: DESC}
        ) {
            nodes {
                slug
                name
                childMarkdownRemark {
                    html
                }
            }
        }
        avatar: file(absolutePath: { regex: "/me-coding-1.jpg/" }) {
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