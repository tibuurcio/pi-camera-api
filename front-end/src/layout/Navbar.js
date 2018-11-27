import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        IoT
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="https://github.com/tibuurcio/pi-camera-api" target="_blank">
            Github
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
