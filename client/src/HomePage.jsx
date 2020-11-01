import React, {useState,useEffect} from 'react';

function HomePage(props)
{
  const [tftd, setTftd]= useState("");


  useEffect(()=>{
  fetch('/home',{
  }).then(res=>res.json())
  .then(result=>{
    setTftd(result.randtip.tip)
  }).catch(x=>console.log(x))
  },[])

  function handleLogin()
  {
    props.Setter('LoginPage')
  }

  function handleMyPlants()
  {
    if(props.LoginStat) props.Setter('MyPlantsPage');
    else alert("Please Sign In");
  }

  function handleFeed()
  {
    if(props.LoginStat) props.Setter('FeedPage');
    else alert("Please Sign In");
  }

  function handleContest(){
    if(props.LoginStat) props.Setter('ContestPage');
    else alert("Please Sign In");
  }

function handleQuestionnaire(){
    if(props.LoginStat) props.Setter('Questionnaire');
    else alert("Please Sign In");
  }

  return (
    <div className="homeDiv ">
    <div className="thoughtForTheDay"><h3><em>{tftd}</em></h3></div>
    <button className="homeButton" onClick={handleQuestionnaire}>✅Questionnaire</button>
    <button className="homeButton" onClick={handleContest}>🏅Contests</button>
    <button className="homeButton" onClick={handleMyPlants}>🍀MyPlants</button>
    <button className="homeButton" onClick={handleFeed}>🖼FEED</button>
    </div>
  );
}

export default HomePage ;
