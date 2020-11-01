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

  var cname = props.PageName==="HomePage"? "headerButton lighter" : "headerButton darker"

  return (
    <header>
    <h1 onClick={handleHome}>GreenHearts</h1>
    {props.LoginStat && <button className={cname} onClick={logout}>LogOut</button>}
    <button className={cname} onClick={handleLogin}>{props.LoginStat? <i class="material-icons">account_circle</i>  : "Login"}</button>

    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("Questionnaire")}><i class="material-icons">assignment_turned_in</i></button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("ContestPage")}>🎖</button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("MyPlantsPage")}><i class="material-icons">local_florist</i></button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("FeedPage")}><i class="material-icons">view_day</i></button>}
    </header>
  );
}

export default Header;
