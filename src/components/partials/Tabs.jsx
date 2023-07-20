import { Link, useLocation } from "react-router-dom"

const Tabs = () => {

    const isActive = (match, location = useLocation()) => {
        return location.pathname === match
    }

  return (
    <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
            <Link to='/tickets' className={`nav-link ${isActive('/tickets') ? 'active' : ''}`}>All</Link>
        </li>
        <li className="nav-item">
            <Link to='/tickets/pending' className={`nav-link ${isActive('/tickets/pending') ? 'active' : ''}`}>Pending</Link>
        </li>
        <li className="nav-item">
            <Link to='/tickets/resolved' className={`nav-link ${isActive('/tickets/resolved') ? 'active' : ''}`}>Resolved</Link>
        </li>
    </ul>
  )
}

export default Tabs