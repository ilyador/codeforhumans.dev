import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { debounce } from 'lodash-es'
import { Element, scroller } from 'react-scroll'
import Tilt from 'react-tilt'
import Particles from 'react-tsparticles'
import { Vector } from 'tsparticles'
import Cursor from '../components/Cursor'
import Mobile from '../components/Mobile'
import Social from '../components/Social'
import Header from '../components/Header'
import SEO from '../components/SEO'
import { pages } from '../components/HomeContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import '../styles/new-home.scss'


const fastSpeed = 100
const restSpeed = 2
const reverseSpeed = -100


let incrementSpeed = 2
let minSpeed = fastSpeed
let maxSpeed = restSpeed
let ascending = maxSpeed > minSpeed


const fadeDuration = 2000
const movementDistance = 4000


function warp (speed) {
  if (speed === 'slow') {
    maxSpeed = restSpeed
    minSpeed = fastSpeed
    incrementSpeed = 2
  }

  if (speed === 'fast') {
    maxSpeed = fastSpeed
    minSpeed = restSpeed
    incrementSpeed = 4
  }

  if (speed === 'reverse-slow') {
    maxSpeed = restSpeed
    minSpeed = reverseSpeed
    incrementSpeed = 2
  }

  if (speed === 'reverse') {
    maxSpeed = reverseSpeed
    minSpeed = restSpeed
    incrementSpeed = 4
  }

  ascending = maxSpeed > minSpeed
}


const customPathGenerator1 = {
  currentVelocity: 0,

  generate: function (particle) {
    const { currentVelocity } = this
    particle.retina.moveSpeed = currentVelocity

    return Vector.origin
  },
  init: function (container) {
    this.currentVelocity = minSpeed
  },
  update: function () {
    if (
      (ascending && this.currentVelocity < maxSpeed - incrementSpeed) ||
      (!ascending && this.currentVelocity > maxSpeed + incrementSpeed)
    ) {
      setTimeout(() => {
        this.currentVelocity = ascending
          ? this.currentVelocity + incrementSpeed
          : this.currentVelocity - incrementSpeed
      }, 50)
    }
  }
}




export default function Stars ({ data, children }) {

  const [move, setMove] = useState({ keepMoving: false, direction: null })
  const [pageNumber, setPageNumber] = useState(0)
  const [showFullContent, setShowFullContent] = useState(false)
  const totalPages = pages.length

  const content = data.allGoogleDocs.nodes.find(node => node.name === 'Mentorship')
  const fullContent = data.allGoogleDocs.nodes.find(node => node.name === 'Mentorship-full')
  const reviews = data.allGoogleDocs.nodes.find(node => node.name === 'Reviews')
  const avatar = data.avatar.childImageSharp.fluid

  const mobile = useMediaQuery('@media (max-width:800px)')


  const particlesInit = useCallback((main) => {
    main.addPathGenerator('customPath', customPathGenerator1)
  }, [])



  useEffect(() => () => { debouncedScrollEffect.cancel() }, [])


  useEffect(() => {
    if (move.keepMoving) {
      if (move.direction === 'up') {
        setPageNumber(pageNumber - 1)
      }
      if (move.direction === 'down') {
        setPageNumber(pageNumber + 1)
      }
    } else {
      scroller.scrollTo('bottom', {
        duration: 130000,
        containerId: 'sidebar',
        smooth: true
      })
    }
  }, [move])


  function handleScroll(event){
    if (showFullContent) return

    if (event.deltaY > 0) {
      if (pageNumber < totalPages - 1) {
        debouncedScrollEffect('down')
      }
    } else {
      if (pageNumber > 0) {
        debouncedScrollEffect('up')
      }
    }
  }


  function scrollEffect(direction) {
    if (direction === 'up') {
      warp('reverse')
      setMove({ keepMoving: true, direction  })
      setTimeout(() => {
        setMove({ keepMoving: false, direction  })
        warp('reverse-slow')
      }, fadeDuration)
    }

    if (direction === 'down') {
      warp('fast')
      setMove({ keepMoving: true, direction })
      setTimeout(() => {
        setMove({ keepMoving: false, direction })
        warp('slow')
      }, fadeDuration)
    }
  }


  const debouncedScrollEffect = useMemo(() => 
    debounce(scrollEffect, 500, {
      leading: true,
      trailing: false
    }), [])



  return (<>
    <SEO/>
    
    {mobile ? <Mobile
      content={fullContent.childMarkdownRemark.html}
      reviews={reviews.childMarkdownRemark.html}
      avatar={avatar}
    /> :
    <div className='desktop-home'>
      <Particles
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#08090a'
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'attract',
                parallax: {
                  force: 60
                }
              }
            },
            modes: {
              attract: {
                factor: 2.2,
                maxSpeed: 20
              }
            }
          },
          particles: {
            move: {
              enable: true,
              speed: maxSpeed,
              direction: 'top',
              angle: {
                value: 20
              },
              random: true,
              outMode: 'out',
              path: {
                enable: true, // this enables the path generator
                delay: {
                  value: 0 // this changes the delay of every custom path call
                },
                generator: 'customPath'
              }
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.1,
                opacity: 0.3
              }
            },
            number: {
              density: {
                enable: true
              },
              value: 250
            },
            opacity: {
              random: {
                enable: true
              },
              value: {
                min: 0.1,
                max: 0.5
              },
              animation: {
                speed: 2,
                minimumValue: 0.1
              }
            },
            size: {
              value: {
                min: 0.5,
                max: 1.5
              },
              animation: {
                speed: 40,
                minimumValue: 0.1
              }
            }
          }
        }}
      />
      <Header homePage/>
      <div className={`main ${showFullContent && 'scrolalble'}`} onWheel={handleScroll}>
        {!showFullContent ? pages.map((page, index) => 
          <div
            key={index}
            className='content'
            style={{ top: (pageNumber === index) ? 0 : (index - pageNumber) * movementDistance }}
          >
            <Tilt
              className='tilt'
              options={{ reverse:true, max: 10, scale: 1, speed: 500 }}
            >
              {React.cloneElement(page.component, {
                clickAction: () => { setShowFullContent(true) }
              })}
            </Tilt>
          </div>
        ) : 
          <div className='full-mentorship-content'>
            <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}/>
            <div className="buttons">
              <a className='call' href='https://calendly.com/ilya-dorman/student-consultation'>
                I still want to talk to a human
              </a>
              <a className='signup' href='https://buy.stripe.com/5kA02EaJXfYl1Py289'>
                I'M READY TO START!
              </a>
            </div>
          </div>
        }
      </div>
      <div className='reviews-title' style={{ opacity: move.keepMoving ? 0 : 1 }}>
        <h5>Student Reviews</h5>
      </div>
      <div className='sidebar' id='sidebar' style={{ opacity: move.keepMoving ? 0 : 0.3 }}>
        <div
          className='reviews'
          dangerouslySetInnerHTML={{ __html: reviews.childMarkdownRemark.html }}
        />
        <Element name='bottom'></Element>
      </div>
      <div className='links' style={{ opacity: move.keepMoving ? 0 : 0.3 }}>
        <div className='blog-link'>
          <Link to='/blog'>
            <h5>Blog</h5>
          </Link>
        </div>
        <Social homePage/>
      </div>
      <Cursor/>
    </div>}
  </>)
}


export const pageQuery = graphql`
  query MainPage {
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
        images {
          childImageSharp {
            fluid(maxWidth: 100, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
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
  }
`