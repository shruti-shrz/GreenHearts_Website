import React, {useState} from 'react';
import './MyProfilePage.css';
import FollowCards from './FollowCards'
import Loader from 'react-loader-spinner';

function MyProfilePage(props)
{
  const [spin, setSpin]= useState(false);
  const [search, setSearch]= useState("");
  const [imgfile, setImgfile]= useState("");
  const [url, setUrl]= useState("");

  function searchClick()
  {

  }

  function setImage()
  {
    setSpin(true);
    const data = new FormData();
    data.append("file",imgfile);
    data.append("upload_preset","gh-images");
    data.append("cloud_name", "green-hearts");
    fetch("https://api.cloudinary.com/v1_1/green-hearts/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setSpin(false);
      setUrl(data.url);})
    .catch(x=> console.log(x));
  }

  return(
    <div className="profileDiv" style={{alignContent: "center"}}>
      <div className="profileSearch">
        <input name="search" onChange={(event)=>setSearch(event.target.value)} placeholder="search people" value={search} />
        <button onClick={searchClick}>🔍</button>
      </div>
      <br/>
      <div className="profileLeft">
        <img src="https://www.vhv.rs/dpng/d/124-1243789_office-man-clipart-png-download-person-on-phone.png" alt="a leaf pic" />
        <h3>Your Name</h3>
        <p>{JSON.parse(localStorage.getItem("user")).email}</p>
        <label className="custom-file-upload">
          <input type="file" onChange={(event)=> setImgfile(event.target.files[0])} />
          Upload Profile Pic
        </label>
        <button onClick={setImage}>Set</button>
        {spin && <Loader
         type="TailSpin"
         color="#24B61A"
         height={50}
         width={120}
         />}
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
