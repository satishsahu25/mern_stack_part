import React, { useMemo, useState ,useEffect} from "react";
import "./auth.css";
import axios from "axios";
import avatar from '../img/logo.png';
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  useEffect(()=>{
    const token=localStorage.getItem('user');
    if(token){
        navigate('/');
    }
  },[]);



  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err,seterr]=useState(false);

  const navigate = useNavigate();

  const userSignUp = async () => {
   
    const userdata = { fullname, email, password };
    if (fullname && email && password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/signup",
          {
            ...userdata,
          }
        );
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
          navigate("/");
        }else{
          seterr(true);
        }

        setemail("");
        setfullname("");
        setpassword("");
      } catch (err) {
        seterr(true);
      
      }
    }else{
      seterr(true);
      
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
            type="text"
            value={fullname}
            placeholder="Full name"
            onChange={(e) => setfullname(e.target.value)}
          />
        </div>
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

        <div className="submit-btns" onClick={userSignUp}>
          <div className="registerbtn">
            Register
          </div>
        </div>
        <Link to="/signin" className="signuplink">SignIn</Link>
      </div>
    </div>
  );
}

export default Signup;
