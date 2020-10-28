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

  function logout()
  {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    props.LoginSetter(false);
  }
  return (
    <header>
    <h1 onClick={handleHome}>GreenHearts</h1>
    <button className="headerButton" onClick={handleLogin}>👩</button>
    <button className="headerButton" onClick={maketrue}>maketrue</button>
    {props.LoginStat && <button className="headerButton" onClick={logout}>LogOut</button>}
    </header>
  );
}

export default Header;
