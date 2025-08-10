import React from "react";
import WsaLogo from "../assets/wsa-logo.svg";

const Header = () => {
  return (
    <div className="header-container-div">
      <img src={WsaLogo} alt="logo" width={182} height={62} />
    </div>
  );
};

export default Header;
