import React from 'react';
<<<<<<< HEAD
import FeedPage from './FeedPage';
=======
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import MyPlantsPage from './MyPlantsPage.jsx';
import MyProfilePage from './MyProfilePage.jsx';
>>>>>>> 041bb5fa398f867c4499a4eef07b934f3fc91e10

function Body(props)
{

  return (
<<<<<<< HEAD
      <FeedPage/>
=======
    <div className='bodyDiv'>
      <p>The Body Here</p>
        {props.PageName==='HomePage' && <HomePage Setter={props.Setter} LoginStat={props.LoginStat} />}
        {props.PageName==='LoginPage' && <LoginPage Setter={props.Setter} LoginSetter={props.LoginSetter} />}
        {props.PageName==='MyPlantsPage' && <MyPlantsPage Setter={props.Setter} />}
        {props.PageName==='MyProfilePage' && <MyProfilePage Setter={props.Setter} />}

    </div>
>>>>>>> 041bb5fa398f867c4499a4eef07b934f3fc91e10
  );
}

export default Body;
