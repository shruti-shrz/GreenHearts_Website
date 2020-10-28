import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
<<<<<<< HEAD
  const [pageState, setPageState] = useState("HomePage");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
=======
  const [pageState, setPageState] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(localStorage.getItem("jwt")!== null)
    if(!isLoggedIn)setIsLoggedIn(true);

>>>>>>> 54f6553f85616e4c9f2d6a53925bffc6f3ffef0f
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
