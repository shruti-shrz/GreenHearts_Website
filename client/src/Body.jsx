import React from 'react';
import FeedPage from './FeedPage';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import MyPlantsPage from './MyPlantsPage.jsx';
import MyProfilePage from './MyProfilePage.jsx';

function Body(props)
{

  return (

      <div className='bodyDiv'>

      <p>The Body Here</p>
        {props.PageName==='HomePage' && <HomePage Setter={props.Setter} LoginStat={props.LoginStat} />}
        {props.PageName==='LoginPage' && <LoginPage Setter={props.Setter} LoginSetter={props.LoginSetter} />}
        {props.PageName==='MyPlantsPage' && <MyPlantsPage Setter={props.Setter} />}
        {props.PageName==='MyProfilePage' && <MyProfilePage Setter={props.Setter} />}
        {props.PageName==='FeedPage' && <FeedPage Setter={props.Setter} />}
      </div>
  );
}

export default Body;
