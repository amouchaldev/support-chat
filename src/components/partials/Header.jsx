import React from 'react'
import { NavLink, useLocation, useMatch, useMatches } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const Header = () => {
const { pathname } = useLocation()
const {token, logout} = useAuth()

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
          <div className="container">
            <NavLink className="navbar-brand" to='/'>YSUPPORT</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {
              token && <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${({isActive}) => isActive ? 'active' : ''}`}>
                        <NavLink className="nav-link" to="/tickets">tickets <span className="visually-hidden">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link" onClick={logout}>Log out</a>
                    </li>
                </ul>
            </div>
            
            }
      </div>
    </nav>
    
  )
}

export default Header