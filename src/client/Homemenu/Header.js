import React from "react"
import { NavLink } from "react-router-dom"
import "./Header.css"
import LoginM from "../components/login/LoginM"

const Header = () => {
  return (
    <div className="header">
      <img className="logo1" src="../../images/logo.gif" />
      <img className="logo2" src="../../images/title.gif" />
      <LoginM className="loginButton" />
    </div>
  )
}

export default Header
