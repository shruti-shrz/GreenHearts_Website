import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
  const [pageState, setPageState] = useState('FeedPage');
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
