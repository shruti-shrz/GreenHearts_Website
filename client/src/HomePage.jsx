import React from 'react';

function HomePage(props)
{
  
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
    <div className="thoughtForTheDay"><h3><em>So this is today's tip ahiateghka j mgiulkqhknwe ejhcilwqjtkjq thoiqwtckqhtaiueht mlkhiuwqethlch</em></h3></div>
    <button className="homeButton">✅Questionnaire</button>
    <button className="homeButton" onClick={handleLogin}>🏅Contests</button>
    <button className="homeButton" onClick={handleMyPlants}>🍀MyPlants</button>
    <button className="homeButton" onClick={handleFeed}>🖼FEED</button>
    </div>
  );
}

export default HomePage ;
