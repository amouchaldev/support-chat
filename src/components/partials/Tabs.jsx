import { NavLink } from "react-router-dom"

const Tabs = () => {

  return (
    <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
            <NavLink to='/tickets' end={true} className={`nav-link ${({isActive}) => isActive ? 'active' : ''}`}>New</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to='/tickets/pending' className={`nav-link ${({isActive}) => isActive ? 'active' : ''}`}>Pending</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to='/tickets/resolved' className={`nav-link ${({isActive}) => isActive ? 'active' : ''}`}>Resolved</NavLink>
        </li>
    </ul>
  )
}

export default Tabs