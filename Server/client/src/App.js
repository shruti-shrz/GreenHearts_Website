import React, {useState,createContext} from 'react';
import './App.css';

import Header from './Header.jsx'
import Body from './Body.jsx'

function App() {
  const [pageState, setPageState] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(localStorage.getItem("jwt")!== null)
    if(!isLoggedIn)setIsLoggedIn(true);

  return (
    <div className={pageState==="HomePage"?"wallpaper" : "normal"}>
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
export const UserContext=createContext();