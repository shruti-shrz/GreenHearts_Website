<<<<<<< HEAD
import React from 'react';
=======
import React, {useState} from 'react';
import logo from './logo.svg';
>>>>>>> 041bb5fa398f867c4499a4eef07b934f3fc91e10
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
  const [pageState, setPageState] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
