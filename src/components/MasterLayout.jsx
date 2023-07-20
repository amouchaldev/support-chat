import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "./partials/Header"
import Footer from "./partials/Footer"
import useAuth from "../hooks/useAuth"
import Login from "./Login"

const MasterLayout = () => {
  const { token } = useAuth()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  return (
    <>  
        <Header />
        <div className="container">          
          {token ? <Outlet /> : <Login previousPathname={{ pathname }}/>}
        </div>
        {/* <Footer /> */}
    </>
  )
}

export default MasterLayout