import React from 'react';
import './styles.css'

export default function NavBar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Weekly Tefillahs
      </a>
      <ul className="menu">
        <CustomLink href="/">Login</CustomLink>
        <CustomLink href="/Subscribe">Subscribe</CustomLink>
        <CustomLink href="/SubmitName">Submit Name</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ href, children, ...props }) {
  const currentPath = window.location.pathname;
  const isActive = currentPath === href;

  return (
    <li className={isActive ? "active" : ""}>
      <a href={href} {...props}>
        {children}
      </a>
    </li>
  );
}
