import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">Tefillah Together</a>
      <ul className="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/subscribe">Subscribe</a></li>
        <li><a href="/submitname">Submit Name</a></li>
        <li><a href="/mynames">My Names</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
