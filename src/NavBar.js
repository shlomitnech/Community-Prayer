import React from 'react';

export default function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                Weekly Tefillahs
            </a>
            <ul>
                <li>
                <a href="/Subscribe">Subscribe</a>
                </li>
                <li>
                <a href="/SubmitName">Submit Names</a>
                </li>
            </ul>
        </nav>
    );
}

