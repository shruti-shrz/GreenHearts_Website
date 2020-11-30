import React, {useState,useEffect} from 'react';
import M from 'materialize-css'
import PlantTalk from './PlantTalk.jsx';

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

  function handlePlantSuggester()
  {
    if(props.LoginStat) props.Setter('PlantSuggester');
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
    <div className="thoughtForTheDay">
      <h2>A lil tip...</h2>
      <h3><em>{tftd}</em></h3>
    </div>
    <button className="homeButton" onClick={handleQuestionnaire}><i class="material-icons">assignment_turned_in</i>Questionnaire</button>
    <button className="homeButton" onClick={handleContest}>🎖Contests</button>
    <button className="homeButton" onClick={handlePlantSuggester}><i class="material-icons">local_florist</i>Plants</button>
    <button className="homeButton" onClick={handleFeed}><i class="material-icons">view_day</i>Feed</button>
    {props.LoginStat && <PlantTalk />}
    </div>

  );
}

export default HomePage ;
