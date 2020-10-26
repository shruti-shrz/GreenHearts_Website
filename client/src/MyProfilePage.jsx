import React from 'react';

function MyProfilePage(props)
{
  return(
    <div className="profileDiv">
    <p>MY profile</p><br/>
    <img className="profileImage"  src="./leaf.webp" alt="a leaf pic" />
    <p>{JSON.parse(localStorage.getItem("user")).email}</p>
    </div>
  );
}

export default MyProfilePage ;
