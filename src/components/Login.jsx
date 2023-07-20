import useAuth from "../hooks/useAuth";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { login, errors, token } = useAuth();
  const email = useRef()
  const password = useRef()
  const Navigate = useNavigate()

  const doLogin = async (e) => {
        e.preventDefault()
        await login(email.current.value, password.current.value)
    }

    useEffect(() => {
        if(token) Navigate('/tickets')
    }, [])

  return (
    <div className="row">
        <div className="col-12 col-lg-8">
            <form onSubmit={e => doLogin(e)}>
                <div className="mb-3">
                <label htmlFor="" className="form-label">Email</label>
                <input type="text" className="form-control" ref={email} />
                { errors?.email && <p className="text-warning">{errors?.email}</p> }
                </div>
                <div className="mb-3">
                <label htmlFor="" className="form-label">Password</label>
                <input type="text" className="form-control" ref={password}/>
                { errors?.password && <p className="text-warning">{errors?.password}</p> }
                </div>
                <div className="mb-3 d-grid">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;
