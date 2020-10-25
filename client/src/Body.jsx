import React from 'react';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import MyPlantsPage from './MyPlantsPage.jsx';
import MyProfilePage from './MyProfilePage.jsx';

function Body(props)
{

  return (
    <div>
      <p>The Body Here</p>
        {props.PageName==='HomePage' && <HomePage Setter={props.Setter} LoginStat={props.LoginStat} />}
        {props.PageName==='LoginPage' && <LoginPage Setter={props.Setter} LoginSetter={props.LoginSetter} />}
        {props.PageName==='MyPlantsPage' && <MyPlantsPage Setter={props.Setter} />}
        {props.PageName==='MyProfilePage' && <MyProfilePage Setter={props.Setter} />}

    </div>
  );
}

export default Body;
