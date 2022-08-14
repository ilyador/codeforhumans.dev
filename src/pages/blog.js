import React from 'react'
import { Link, graphql } from 'gatsby'
import Header from '../components/Header'
import Social from '../components/Social'
import SEO from '../components/SEO'


export default function BlogIndex ({ data }) {
  const posts = data.allGoogleDocs.nodes

  return (
    <>
      <SEO title='Blog'/>
      <Header/>
      <div className='wrapper'>
        <div className="blog">
        {posts.map(({ slug, date, author, name: title, childMarkdownRemark: content }) => (
          <article key={title}>
            <header>
              <div className="header-left">
                <h1>
                  <Link to={slug}>
                    {title}
                  </Link>
                </h1>
                <small>{date} • by {author}</small>
              </div>
            </header>
            <section>
              <span dangerouslySetInnerHTML={{ __html: content.excerpt }}/>
              &nbsp;&nbsp;
              <Link to={slug}>
                read more
              </Link>
            </section>
          </article>
        ))}
        </div>
      </div>
      <Social/>
    </>
  )
}


export const pageQuery = graphql`
  query {
    allGoogleDocs(
      filter: {path: {regex: "/blog/"}}
      sort: {fields: [createdTime], order: DESC}
    ) {
      nodes {
        slug
        name
        author
        childMarkdownRemark {
          excerpt(pruneLength: 200)
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
