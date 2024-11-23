import Authform from "../components/Authform"
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  return (
    <>
        <>
           <Authform isLoginPage={true}/>
        </>
    </>
  )
}

export default Login