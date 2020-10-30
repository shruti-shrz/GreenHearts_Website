import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
  const [pageState, setPageState] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(localStorage.getItem("jwt")!== null)
    if(!isLoggedIn)setIsLoggedIn(true);

  return (
    <div>
      <Header
        PageName={pageState}
        Setter={setPageState}
        LoginStat={isLoggedIn}
        LoginSetter={setIsLoggedIn}
      />
      <Body
        PageName={pageState}
        Setter={setPageState}
        LoginStat={isLoggedIn}
        LoginSetter={setIsLoggedIn}
      />
    </div>
  );
}

export default App;
