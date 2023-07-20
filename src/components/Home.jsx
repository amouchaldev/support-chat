import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const Home = () => {
  const {user} = useAuth()
  return (
    <div className='mt-5'>
      <div className="row">
        <div className="col-10">
            <h5 className="mb-3">Welcome {user.name}</h5>
            <Link to='/tickets' className="btn btn-primary mb-md-4 mb-5">Check your tickets</Link>
            <img src="undraw_active_support.svg" alt="" className='img-fluid d-block' />
        </div>
      </div>
    </div>
  )
}

export default Home