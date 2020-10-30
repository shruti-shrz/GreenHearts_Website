import React, {useState,useEffect} from 'react';

function HomePage(props)
{
  const [tftd, setTftd]= useState("");



    fetch('/home',{})
    .then(result=>{
      console.log("here");
      console.log(result);
    })


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

  return (
    <div className="homeDiv ">
    <div className="thoughtForTheDay"><h3><em>{tftd}</em></h3></div>
    <button className="homeButton">✅Questionnaire</button>
    <button className="homeButton" onClick={handleLogin}>🏅Contests</button>
    <button className="homeButton" onClick={handleMyPlants}>🍀MyPlants</button>
    <button className="homeButton" onClick={handleFeed}>🖼FEED</button>
    </div>
  );
}

export default HomePage ;
