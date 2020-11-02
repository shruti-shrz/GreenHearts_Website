import React,{useState, useEffect} from 'react';
import M from 'materialize-css';

const filterOptions=['/allpost', '/mypost', "/followingpost", "/pinnedpost"];

function renderComment(props){
  return(
      <div style={{marginBottom:"0px"}}>
          <p style={{marginBottom:"0px"}} ><strong>{props.postedBy.name}</strong>  {props.text}</p>
      </div>
  );
  }

function FeedPage(){
    const [postMessage, setpostMessage] = useState("");
    const [image, setimage] = useState("");
    const [imageURL, setimageURL] = useState("")
    const [posts, setposts] = useState([]);
    const [user, setuser] = useState({});
    const [filterType, setfilterType] = useState(filterOptions[0]);
    const [comment, setcomment] = useState("");
    const [postID, setpostID]  = useState("")

    const likePost=(id)=>{
      fetch("/like",{
          method:"put",
          headers:{"Content-Type":"application/json",
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
          body:JSON.stringify({
              postId:id
          })
        })
        .then(res=>res.json())
        .then(result=>{
          console.log(result);
          const newData =posts.map(item=>{
              if(item._id==result._id){
                item.likes=result.likes;
                  return item;
              }
              else{
                return item;
              }
          })
          setposts(newData);
        }).catch(error=>{
            console.log(error);
        });
  }

  const pinPost=(id)=>{
    fetch("/pinpost",{
        method:"put",
        headers:{"Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
            postId:id
        })
      })
      .then(res=>res.json())
      .then(result=>{
        console.log("this is pin")
        console.log(result);
        setuser(result);
      }).catch(error=>{
          console.log(error);
      });
}

  const unlikePost=(id)=>{
      fetch("/unlike",{
          method:"put",
          headers:{"Content-Type":"application/json",
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
          body:JSON.stringify({
              postId:id
          })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData =posts.map(item=>{
                console.log(result);
                if(item._id==result._id){
                    return result;
                }
                else{
                  return item;
                }
            })
            setposts(newData);
        }).catch(error=>{
          console.log(error);
      });
  }

   const makeComment=(text,id)=>{
       fetch("/comment",{
           method:"put",
           headers:{"Content-Type":"application/json",
                   "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
           body:JSON.stringify({
               postId:id,
               text
           })
         })
         .then(res=>res.json())
         .then(result=>{
          setcomment("")
          console.log(result);
             const newData =posts.map(item=>{
                 if(item._id==result._id){
                     return result;
                 }
                 else{
                   return item;
                 }
             })
             setposts(newData);
         }).catch(error=>{
           console.log(error);
       });
   }

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
                console.log("you got something")
                console.log(result)
                if(filterType===filterOptions[0] || filterType===filterOptions[2])
                setposts(result.posts.reverse());
                else if(filterType===filterOptions[3])
                setposts(result.posts[0].pinnedpost);
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
                
                <div>
            {posts.map(props=>{
              console.log(props)
                return(
                <div className="postCard">
                <div>
                    <div>
                      {props.postedBy.profileImage? 
                      <img className="profilePhoto" src={props.postedBy.profileImage} alt="👤"/>:
                      <img className="profilePhoto" src="./profile-default-icon.png" alt="👤"/>
                      }
                    <h3>{props.postedBy.name}</h3>
                    </div>
                </div>
                {props.photo ? <img src={props.photo} alt="the posted image"/> : <div></div>}
                <p>{props.body}</p>
                <div style={{marginBottom:"10px"}}>
                    {
                        props.likes.includes(user._id)?
                        <button
                        onClick={()=>{unlikePost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><i className="material-icons">thumb_down</i></button>
                        :
                        <button
                        onClick={()=>{likePost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><i className="material-icons">thumb_up</i></button>
                        }
                        {
                          user.pinnedpost.includes(props._id)?
                          <button
                        //onClick={()=>{pinPost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><i className="material-icons">bookmark</i></button>
                        :
                        <button
                        onClick={()=>{pinPost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><i className="material-icons">bookmark_border</i></button>
                        }
                </div>
                <div style={{marginTop:"-40px"}}>
                <p style={{float:"right"}}>&nbsp;&nbsp;&nbsp;<strong>{props.likes.length}</strong> likes </p>
                <p style={{float:"right"}}><strong>{props.comments.length}</strong> comments</p>
                </div>
                <div style={{marginBottom:"0px"}}>
                    <input
                        onChange={(event)=>{
                            setcomment(event.target.value)
                            setpostID(props._id)
                        }}
                        value={postID===props._id? comment :""}
                    style={{marginLeft:"50px"},{height:"20px"},{width:"530px"}} placeholder="Comment..." type="text" id="message"/>
                    <button
                    onClick={()=>{makeComment(comment,postID)} }
                    className="icon"><img style={{height:"20px"},{width:"20px"}} src="./send-icon.png"/></button>
                </div>
                <div style={{marginBottom:"5px"}}>
                    {
                    props.comments.reverse().map(renderComment)}
                </div>
            </div>
            )
            })}
        </div>
                </div>
        </div>
    );
}

export default FeedPage;