import React, {useState} from 'react';
import FollowCards from './FollowCards'

function MyProfilePage(props)
{
  const [search, setSearch]= useState("");

  function searchClick()
  {

  }

  return(
    <div className="profileDiv" style={{alignContent: "center"}}>
      <div className="profileSearch">
        <input name="search" onChange={(x)=>setSearch(x)} placeholder="search people" value={search} />
        <button onClick={searchClick}>🔍</button>
      </div>
      <br/>
      <div className="profileLeft">
        <img src="https://www.vhv.rs/dpng/d/124-1243789_office-man-clipart-png-download-person-on-phone.png" alt="a leaf pic" />
        <h3>Your Name</h3>
        <p>{JSON.parse(localStorage.getItem("user")).email}</p>
      </div>
      <div className="profileFoll profileLeft">
        <button className="greenButton">Followers</button>
        <button className="greenButton">Following</button>
        <FollowCards />
      </div>
    </div>
  );
}

export default MyProfilePage ;
