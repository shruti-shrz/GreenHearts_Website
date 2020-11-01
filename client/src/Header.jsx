import React from 'react';

function Header(props)
{
  function handleHome(){props.Setter('HomePage');}
  function handleLogin(){
    if(props.LoginStat) props.Setter('MyProfilePage');
    else props.Setter('LoginPage');}



  function logout()
  {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    props.LoginSetter(false);
    props.Setter("HomePage");
  }
  return (
    <header>
    <h1 onClick={handleHome}>GreenHearts</h1>
    <button className="headerButton" onClick={handleLogin}>👩</button>
    {props.LoginStat && <button className="headerButton" onClick={logout}>LogOut</button>}
    {props.LoginStat && props.PageName!=="HomePage" && props.PageName!=="Questionnaire" && <button className="headerButton" onClick={()=>props.Setter("Questionnaire")}>✅</button>}
    {props.LoginStat && props.PageName!=="HomePage" && props.PageName!=="ContestPage" && <button className="headerButton" onClick={()=>props.Setter("ContestPage")}>🎖</button>}
    {props.LoginStat && props.PageName!=="HomePage" && props.PageName!=="MyPlantsPage" && <button className="headerButton" onClick={()=>props.Setter("MyPlantsPage")}>🌵</button>}
    {props.LoginStat && props.PageName!=="HomePage" && props.PageName!=="FeedPage" && <button className="headerButton" onClick={()=>props.Setter("FeedPage")}>🖼</button>}
    </header>
  );
}

export default Header;
