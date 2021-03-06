import React, {useState, useEffect} from 'react';
import './MyProfilePage.css';
import FollowCards from './FollowCards'
import Loader from 'react-loader-spinner';
import {List} from 'react-virtualized';
import M from 'materialize-css'

function MyProfilePage(props)
{
  const [spin, setSpin]= useState(false);
  const [search, setSearch]= useState("");
  const [imgfile, setImgfile]= useState("");
  const [url, setUrl]= useState("");
  const [foll, setFoll]= useState("Followers")
  const [userdetails, setUserdetails]= useState({name:"", email:"", url:"placeholder.png",numplants:"",followers:[], following:[]})
  const [found, setFound]=useState([])
  const [fcards, setFcards]=useState([])

  useEffect(()=>{
    if(search)
    {
      fetch("/search",{
        method:"post",
        headers:{"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          query:search
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
          console.log(data.error)
        }
        else
        {
          console.log(data.user)
          setFound(data.user)
        }
      });
    }

    else{
      setFound([]);
    }

  },[search])

  function followThis(x)
  {
    setSpin(true)
    var id=x.target.getAttribute("name")
    var z= found.filter((t)=>(t._id!==id))
    setFound(z)
    fetch("/follow",{
      method:"put",
      headers:{"Content-Type":"application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
      body:JSON.stringify({
        followId:id
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
      M.toast({html: data.error})
      setSpin(false)
      }
      else
      {
        M.toast({html: "you are a follower"})
        console.log(data.result)
        console.log("you are a follower")
        var x=userdetails

        x.following.push(data.result)
        setUserdetails(x)
        setSpin(false)
        setSearch("")
      }
    });
  }


  function showcard(x)
  {
    return (
      <div name={x._id} className="fCard">
        <img src={x.url} />
        <p>{x.name}</p>
      </div>
    );
  }


  function rowRenderer({
                            key, // Unique key within array of rows
                            index, // Index of row within collection
                            isScrolling, // The List is currently being scrolled
                            isVisible, // This row is visible within the List (eg it is not an overscanned row)
                            style, // Style object to be applied to row (to position it)
                          }) {
                            return (
                              <div name={found[index]._id} style={style} className="fCard">
                                <img src={found[index].url}  />
                                <p>{found[index].name}</p>
                                <button name={found[index]._id} onClick={(x)=>followThis(x)}>Follow</button>
                              </div>
                            );
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
  useEffect(()=>{
    if(url)
    {
      fetch("/updatepic",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        M.toast({html: data.error})
        }
        else
        {
          M.toast({html: "updated profil pic"})
          var x= userdetails
          x.url=url
          setUserdetails(x)
          localStorage.setItem("user",JSON.stringify(x));
          setUrl("")
        }
        setSpin(false);
      });
    }

  },[url])

useEffect(()=>{
    fetch('/profile',{
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      var x=result.user;
      setUserdetails(x);
      localStorage.setItem("user",JSON.stringify(x));

    })
},[])



console.log("qwer")
  return(
    <div className="profileDiv" style={{alignContent: "center"}}>
      <div className="profileSearch">
        <input name="search" onChange={(event)=>setSearch(event.target.value)} autocomplete="off" placeholder="🔍search people" value={search} />
        <List
        width={280}
        height={200}
        rowCount={found.length}
        rowHeight={60}
        rowRenderer={rowRenderer}
      />
      </div>
      <br/>
      <div className="profileLeft">
        <img src={userdetails.url} alt="a leaf pic" />
        <div>
          <h3>{userdetails.name}</h3>
          <h4>🌵{userdetails.numplants}</h4>


        </div>
        <p><strong>{userdetails.email}</strong></p>
        <label className="custom-file-upload">
          <input type="file" onChange={(event)=> setImgfile(event.target.files[0])} />
          <strong>Upload Profile Pic</strong>
        </label>
        <button onClick={setImage}>✔</button>

      </div>
      <div className="profileFoll profileLeft">
      {spin && <Loader
       type="TailSpin"
       color="#24B61A"
       height={50}
       width={120}
       />}
        <button className="greenButton" onClick={()=>{setFcards(userdetails.followers); console.log("Follower")}}> Followers {userdetails.followers.length}</button>
        <button className="greenButton" onClick={()=>setFcards(userdetails.following)}>Following {userdetails.following.length}</button>
        <div className="followCards">
          {fcards.map(showcard)}
        </div>
        <strong>scroll down for plants</strong>
      </div>

    </div>
  );

//<CustomizedDialogs userDet={userdetails} clickSetter={setclick} click={click} />
//<PlantInfoDialog clickSetter={setclick} click={click} />
}

export default MyProfilePage ;
