import React from 'react';
import NavBar from "./NavBar"
import Home from './pages/Home';
import SubmitName from './pages/SubmitName';
import Subscribe from './pages/Subscribe';
import './styles.css'

function App() {
  let component
  switch(window.location.pathname){
    case "/":
      component = <Home/>
      break
    case "/SubmitName":
      component = <SubmitName/>
      break
    case "/Subscribe":
      component = <Subscribe/>
      break
    default:
      component = <Home/>
  }
  return (
    <>
    <NavBar/>
    {component}
    </>

  );
}

export default App;