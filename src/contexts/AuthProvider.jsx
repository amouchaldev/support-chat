import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("_token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("_user")));
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate()
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("_token", response.data.token);
        setToken( response.data.token );

        localStorage.setItem("_user", JSON.stringify({id: response.data.user.id, name: response.data.user.name}));
        setUser({id: response.data.user.id, name: response.data.user.name});
        Navigate('/tickets')

      } 
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  };

  return (
    <AuthContext.Provider value={{ login, user, token, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
