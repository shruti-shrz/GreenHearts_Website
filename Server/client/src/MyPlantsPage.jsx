import React, {useState, useEffect} from 'react';
import './MyPlantsPage.css';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import M from 'materialize-css'

function MyPlantsPage(props)
{
  const [spin, setSpin]= useState(false);
  const [pname, setPname]= useState("");
  const [imgfile, setImgfile]= useState("");
  const [url, setUrl]= useState("");
  const [plants, setPlants]= useState([]);
  var date= new Date().toDateString();

  useEffect(()=>{
    if(url)
    {
      fetch("/addplant",{
        method:"post",
        headers:{"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          name: pname,
          url,
          date
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        M.toast({html: data.error})
        }
        else
        {
          M.toast({html: "added plant"})
          setPname("")
          setPlants([...plants,{
            name: pname,
            url,
            date
          }])
        }
        setSpin(false);
      });
    }

  },[url])

  function addplant()
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
      setUrl(data.url);})
    .catch(x=> console.log(x));
  }

  useEffect(()=>{
    fetch('/myplants',{
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      setPlants(result.plants)
    }).catch(x=>console.log(x))
  },[])

  function plantmaker(p)
  {
    return (
        <div className="plantCard">
          <img src={p.url} />
          <button onClick={()=>removePlant(p._id)} >🗑</button>
          <h4>{p.name}</h4>
          <p>{p.date}</p>
        </div>
    );
  }

  function removePlant(x)
  {
    setSpin(true)
    fetch("/removeplant",{
      method:"post",
      headers:{"Content-Type":"application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
      body:JSON.stringify({
        id:x
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
      M.toast({html: data.error})
      }
      else
      {
        M.toast({html: "removed plant"})
        var pl= plants.filter((y)=>(y._id!==x))
        setPlants(pl)
      }
      setSpin(false);
    });
  }

  return (
    <div>
      <div className="addPlant">
        <input placeholder="Plant Name" onChange={(event)=> setPname(event.target.value)} value={pname}/>
        <input type="file"/>
        <label className="c-file-upload">
          <input type="file" onChange={(event)=> setImgfile(event.target.files[0])} />
          Upload Picture
        </label>
        <button onClick={addplant}>➕</button>
        {spin && <Loader
         type="TailSpin"
         color="#24B61A"
         height={50}
         width={120}
         />}
      </div>
      <div className="plantHolder">
        {plants.map(plantmaker)}
      </div>
    </div>


  );
}

export default MyPlantsPage;
