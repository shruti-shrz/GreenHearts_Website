import React, {useState} from 'react';
import './MyPlantsPage.css';
import Loader from 'react-loader-spinner';

function MyPlantsPage(props)
{
  const [spin, setSpin]= useState(false);
  const [pname, setPname]= useState("");
  const [imgfile, setImgfile]= useState("");
  const [url, setUrl]= useState("");

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
      setSpin(false);
      setUrl(data.url);})
    .catch(x=> console.log(x));

  }

  return (
    <div>
      <div className="addPlant">
        <input placeholder="Plant Name" onChange={(event)=> setPname(event.target.value)}/>
        <input type="file"/>
        <label className="custom-file-upload">
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
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
      </div>
    </div>


  );
}

export default MyPlantsPage;
