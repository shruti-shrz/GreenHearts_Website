import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
  const [pageState, setPageState] = useState('ContestPage');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
