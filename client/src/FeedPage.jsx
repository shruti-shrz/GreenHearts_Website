import React,{useState, useEffect} from 'react';
import Posts from './Posts';
import M from 'materialize-css';

const filterOptions=['/allpost', '/mypost', "Following", "Pinned"];

function FeedPage(){
    const [postMessage, setpostMessage] = useState("");
    const [image, setimage] = useState("");
    const [imageURL, setimageURL] = useState("")
    const [posts, setposts] = useState([]);
    const [user, setuser] = useState({});
    const [filterType, setfilterType] = useState(filterOptions[0]);
    


    useEffect(()=>{
        fetch('/profile',{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
              console.log(result.user);
            setuser(result.user);
          });
    },[])

    useEffect(()=>{
            fetch(filterType,{
                headers:{
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
              }).then(res=>res.json())
              .then(result=>{
                if(filterType==filterOptions[0])
                setposts(result.posts.reverse());
                else
                setposts(result.myposts.reverse());
              });
        },[filterType])

    useEffect(() => {
        if(imageURL){
                fetch("/createpost",{
                method:"post",
                headers:{"Content-Type":"application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
              },
                body:JSON.stringify({
                    title:"dummy title",
                  body: postMessage,
                  photo: imageURL
                })
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.error)
                {
                    M.toast({html: data.error})}
                else
                {
                  M.toast({html: "Posted!!"})
                  setpostMessage("")
                  setimage("")
                  setposts([{
                      postedBy:{
                        profileImage: user.url,
                        name: user.name,
                      },
                    photo:imageURL,
                    body: postMessage,
                    likes: [],
                    comments:[]
                   },...posts])
                }
              });
        }
    }, [imageURL])

    const postDetails=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","gh-images");
        data.append("cloud_name", "green-hearts");
        fetch("https://api.cloudinary.com/v1_1/green-hearts/image/upload",{
        method:"post",
        body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setimageURL(data.url);
        })
        .catch(error=>{console.log(error);})
 
    }
 
    return(
        <div style={{alignContent: "center"}}>
            <div className="filterSection">
                <input type="radio" checked={filterType===filterOptions[0]} onChange={()=>{setfilterType(filterOptions[0])}} id="all"/>
                <label for="all">All Posts</label>
                <br/>
                <input type="radio" checked={filterType===filterOptions[1]} onChange={()=>{setfilterType(filterOptions[1])}} id="my"/>
                <label for="my">My Posts</label>
                <br/>
                <input type="radio" checked={filterType===filterOptions[2]} onChange={()=>{setfilterType(filterOptions[2])}} id="following"/>
                <label for="following">Following Posts</label>
                <br/>
                <input type="radio" checked={filterType===filterOptions[3]} onChange={()=>{setfilterType(filterOptions[3])}} id="pinned"/>
                <label for="pinned">Pinned Posts</label>
                <br/>
            </div>
            <div className="postSection">
                <div className="postTemplate">
                    <input id="image-input" type="file" className="icon" onChange={(event)=>{
                        setimage(event.target.files[0]);
                    }} />
                    <label for="image-input">
                    <img style={{height:"20px"},{width:"20px"}} src="./camera-icon.png"/>
                    </label>
                    <input onChange={(event)=>{
                        setpostMessage(event.target.value)
                    }} value={postMessage} style={{marginLeft:"10px"},{height:"20px"},{width:"510px"}} placeholder="Type your message here!!" type="text" id="message"/>
                    <button onClick={postDetails} className="icon"><img style={{height:"20px"},{width:"20px"}} src="./send-icon.png"/></button>
                </div>
                <Posts data={posts}/>
                </div>
        </div>
    );
}

export default FeedPage;