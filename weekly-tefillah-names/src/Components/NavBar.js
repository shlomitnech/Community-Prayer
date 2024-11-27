import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">Tefillah Together</a>
      <ul className="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/Subscribe">Subscribe</a></li>
        <li><a href="/SubmitName">Submit Name</a></li>
        <li><a href="/MyNames">My Names</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
