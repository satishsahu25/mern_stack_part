import React, { useState ,useMemo,useEffect} from "react";
import axios from "axios";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import avatar from '../img/logo.png';
function Login() {

 
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate=useNavigate();

  const [err,setErr]=useState(false);

  const userSignin = async () => {
    const userdata = { email, password };
    if (email && password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/signin",
          {
            ...userdata,
          }
        );
        if (response.status === 200) {
          localStorage.setItem('user',JSON.stringify(response.data.user));
          
          setemail("");
          setpassword("");
          navigate('/');
        }else{
          setErr(true);
        }
      } catch (err) {
        setErr(true);
      }
    }
  };


  return (
    <div className="signup">
    
      <div className="forms">
      <img src={avatar} className="logo" alt="" />
      {err&&<div className="error">Wrong credentials</div>}
        <div className="input-control">
          <input
            className="inputs"
            value={email}
            type="email"
            placeholder={"Email Address"}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="input-control">
          <input
            className="inputs"
            value={password}
            type="password"
            
            placeholder={"Password"}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <div className="submit-btns" onClick={userSignin}>
          <div className="registerbtn">
            Login
          </div>
        </div>

        <Link to="/signup" className="signuplink">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
