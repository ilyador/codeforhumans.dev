import React from 'react'
import { Link } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import YouTube from '@material-ui/icons/YouTube'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import '../styles/social.scss'


export default function Social ({ homePage }) {
  return (
    <footer className={`social ${homePage && 'home-page'}`}>
      <IconButton
        component='a'
        href='https://www.youtube.com/channel/UCapAus_37jAnXTOTtIzZaag'
      >
        <YouTube fontSize='large'/>
      </IconButton>
      <IconButton
        component='a'
        href='https://www.linkedin.com/in/ilyadorman/'
      >
        <LinkedInIcon fontSize='large'/>
      </IconButton>
      <IconButton
        component='a'
        href='https://www.facebook.com/codeforhumansschool'
      >
        <FacebookIcon fontSize='large'/>
      </IconButton>
      <IconButton
        component='a'
        href='https://www.instagram.com/dorman.ilya/'
      >
        <InstagramIcon fontSize='large'/>
      </IconButton>
    </footer>
  )
}
