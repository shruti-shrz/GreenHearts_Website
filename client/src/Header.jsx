import React from 'react';

function Header(props)
{
  function handleHome(){props.Setter('HomePage');}
  function handleLogin(){
    if(props.LoginStat) props.Setter('MyProfilePage');
    else props.Setter('LoginPage');}

  function maketrue()
  {
    props.LoginSetter(true);
  }
  return (
    <header>
    <h1 onClick={handleHome}>GreenHearts</h1>
    <button className="headerButton" onClick={handleLogin}>👩</button>
    <button className="headerButton" onClick={maketrue}>maketrue</button>
    </header>
  );
}

export default Header;
