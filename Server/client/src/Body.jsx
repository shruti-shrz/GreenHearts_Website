import React from 'react';
import FeedPage from './FeedPage';
import ContestPage from './ContestPage';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import MyProfilePage from './MyProfilePage.jsx';
import Questionnaire from './Questionnaire';
import CustomizedDialogs from './schumma.jsx';
import PlantSuggester from './PlantSuggester';
import MyPlantsPage from './MyPlantsPage';


function Body(props)
{

  return (
    <div className='bodyDiv'>
        {props.PageName==='HomePage' && <HomePage Setter={props.Setter} LoginStat={props.LoginStat} />}
        {props.PageName==='LoginPage' && <LoginPage Setter={props.Setter} LoginSetter={props.LoginSetter} />}
        {props.PageName==='MyProfilePage' && <div><MyProfilePage Setter={props.Setter} /><MyPlantsPage Setter={props.Setter} /></div>}
        {props.PageName==='PlantSuggester' && <PlantSuggester Setter={props.Setter} />}
        {props.PageName==='FeedPage' && <FeedPage Setter={props.Setter} />}
        {props.PageName==='ContestPage' && <ContestPage Setter={props.Setter}/>}
        {props.PageName==='Questionnaire' && <Questionnaire Setter={props.Setter}/>}
      
    </div>
  );
}

export default Body;
