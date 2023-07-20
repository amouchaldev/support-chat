import React from 'react'
import { Link, useLocation, useMatch, useMatches } from 'react-router-dom'

const Header = () => {
const { pathname } = useLocation()

const isActive = (match, location = pathname) => {
  return location === match
}
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
          <div className="container">
            <Link className="navbar-brand" to='/'>YSUPPORT</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${isActive('/tickets') ? 'active':''}`}>
                        <Link className="nav-link" to="/tickets">tickets <span className="visually-hidden">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Log out</a>
                    </li>
                </ul>
            </div>
      </div>
    </nav>
    
  )
}

export default Header