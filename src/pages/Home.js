// Home.js
import React from 'react';
import LoginForm from "../components/LoginForm";

function Home() {
  return (
    <div>
      <h2>Tefilah Database</h2>
      <p>Here we write the thing about davening for others. Every week we rotate the topic of who we daven for.</p>

      <ul>
        <li>Submit new names</li>
        <li>Subscribe to receive the weekly list to your email</li>
      </ul>
      <LoginForm />
    </div>
  );
}

export default Home;
