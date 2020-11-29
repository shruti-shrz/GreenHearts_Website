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
  var ghhover= props.PageName!=="HomePage" ? "Click here to navigate to the home page" :  "Welcome to GreenHearts!"
  return (
    <header>
    <h1 onClick={handleHome} title={ghhover} >GreenHearts</h1>
    {props.LoginStat && <button className={cname} onClick={logout}>LogOut</button>}
    {!props.LoginStat && <button className={cname} onClick={()=>props.Setter("LoginPage")}>Login</button>}
    {props.LoginStat && <img src={JSON.parse(localStorage.getItem("user")).url} onClick={()=>props.Setter("MyProfilePage")} title="My Profile"  />}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("Questionnaire")} title="Questionnaire"><i class="material-icons">assignment_turned_in</i></button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("ContestPage")} title="Contests">🎖</button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter('PlantSuggester')} title="Plant Suggester"><i class="material-icons">local_florist</i></button>}
    {props.LoginStat && props.PageName!=="HomePage"  && <button className={cname} onClick={()=>props.Setter("FeedPage")} title="Feed"><i class="material-icons">view_day</i></button>}

    </header>
  );
}
//{props.LoginStat && <img src={localStorage.getItem("user").get("url")} />}
export default Header;
