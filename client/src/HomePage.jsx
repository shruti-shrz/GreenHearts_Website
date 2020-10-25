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
  return (
    <div className="homeDiv">
    <button className="homeButton">🧚‍♀️</button>
    <button className="homeButton" onClick={handleLogin}>🧚lOGIN♀️</button>
    <button className="homeButton" onClick={handleMyPlants}>>🍀MyPlants♀️</button>
    </div>
  );
}

export default HomePage ;
