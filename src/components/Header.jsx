import React from "react";
import "./Header.css";
import Logo from "../assets/images/netflix-logo.png";
import UserImage from "../assets/images/usuario.png";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src={Logo} alt="netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src={UserImage} alt="usuário" />
        </a>
      </div>
    </header>
  );
};
