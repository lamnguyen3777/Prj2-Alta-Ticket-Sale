import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="header__logo">
        <div className="">
          <img src="./imgs/logo.svg" alt="" className="header__logo" />
        </div>
      </div>
      <div className="header__main">
        <div className="header__search">
          <input type="text" placeholder="Search" />
          <img src="./imgs/search.svg" alt="" />
        </div>
        <div className="header__notify">
          <i className="bx bx-envelope"></i>
          <i className="bx bx-bell"></i>
          <img src="./imgs/avatar.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
