import React, { useState } from 'react'
import { Link } from 'gatsby'
import clsx from 'clsx'
import '../styles/header.scss'
import logo from '../../content/pages/home/logo.png'


const NavLink = props => (
  <Link {...props} getProps={({ isCurrent }) => ({
    style: { fontWeight: isCurrent && 800 }
  })}/>
)


export default function Header ({ homePage }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className={`site-header ${homePage ? 'home-page' : 'inner-page'}`}>
      <Link to={'/'} className="header-content">
        <div className="logo-wrap">
          <img className='logo' src={logo} alt="logo"/>
        </div>
        <div className="header-text">
          <h1>Code For Humans</h1>
          <h4>Learn to Learn to Code</h4>
        </div>
      </Link>

      {!homePage && <ul className="navigation">
        <li>
          <ul
            className={clsx('dropdown', showMenu && 'show')}
            onClick={() => {setShowMenu(false)}}
          >
            <li onClick={() => {setShowMenu(true)}}>
              <NavLink to={'/'}>
                Mentorship
              </NavLink>
            </li>
            <li>
              <NavLink to={'/mentorship'}>
                Sign Up!
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to={'/blog'}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to={'/about'}>
            About
          </NavLink>
        </li>
      </ul>}
    </header>
  )
}
