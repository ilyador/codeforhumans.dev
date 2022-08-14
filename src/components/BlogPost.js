import Image from 'gatsby-image'
import React from 'react'
import { Link } from 'gatsby'
import CTA from '../components/CTAbuttons'


export default function BlogPost ({ title, description, nav, post, date, author, avatar }) {
  const { previous, next } = nav

  return (
    <article>
      <header>
        <div className="header-left">
          <h1>{title}</h1>
          <small>{date}</small>
        </div>
        <div className="bio">
          <small>Written by<br/> {author}</small>
          <Image
            fixed={avatar}
            alt={author}
            imgStyle={{ borderRadius: `50%` }}
          />
        </div>
      </header>

      <section dangerouslySetInnerHTML={{ __html: post }}/>

      <CTA/>

      {(previous && next) && <nav className="bottom-nav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.link} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.link} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>}
    </article>
  )
}
