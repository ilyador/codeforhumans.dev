import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import CTA from '../components/CTAbuttons'
import Header from '../components/Header'
import Social from '../components/Social'
import 'modern-css-reset'
import '../styles/content.scss'


export default function Mobile ({ content, reviews, avatar }) {
  return (<>
    <Header/>
    <div className='mentorship'>
      <article>
        <div
          className='course-content'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <article id='signup'>
        <header>
          <h1>Sign Up & Start Today!</h1>
        </header>
        <CTA/>
      </article>
      <article id='reviews' className='reviews'>
        <header>
          <h1>Client Reviews</h1>
        </header>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: reviews }}
        />
        <div className='profile'>
          <Image
            fluid={avatar}
            alt='Ilya Dorman'/>
        </div>
      </article>
      <Social/>
    </div>
  </>)
}
