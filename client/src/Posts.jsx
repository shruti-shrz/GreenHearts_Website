import React,{useState, useEffect, useContext} from 'react';
import {UserContext} from "./App";
function renderComment(props){
    return(
        <div style={{marginBottom:"0px"}}>
            <p style={{marginBottom:"0px"}} ><strong>{props.postedBy.name}</strong>  {props.text}</p>
        </div>
    );
    }

/**************************************
label
label_outline
bookmark
bookmark_border

thumb_up
thumb_down
mms
receipt
format_list_numbered
playlist_add_check
view_day
spa
local_florist
group
assignment_turned_in

*/

function Posts(props1){
    const [data, setdata] = useState([]);
    const [comment, setcomment] = useState("");
    const [postID, setpostID]  = useState("")
    //const {state,dispatch} = useContext(UserContext)
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
            const newData =data.map(item=>{
                if(item._id==result._id){
                    return result;
                }
                else{
                  return item;
                }
            })
            setdata(newData);
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
              const newData =data.map(item=>{
                  console.log(result);
                  if(item._id==result._id){
                      return result;
                  }
                  else{
                    return item;
                  }
              })
              setdata(newData);
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
               const newData =data.map(item=>{
                   if(item._id==result._id){
                       return result;
                   }
                   else{
                     return item;
                   }
               })
               setdata(newData);
           }).catch(error=>{
             console.log(error);
         });
     }


    return(
        <div>
            {props1.data.map(props=>{
                return(
                <div className="postCard">
                <div>
                    <div>
                    <img className="profilePhoto" src={props.postedBy.profileImage} alt="👤"/>
                    <h3>{props.postedBy.name}</h3>
                    </div>
                </div>
                <img src={props.photo} alt="the posted image"/>
                <p>{props.body}</p>
                <div style={{marginBottom:"10px"}}>
                    {
                        props.likes.includes("5f9b8f31c1280e1d98dee46f")?
                        <button
                        onClick={()=>{unlikePost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}>Dislike</button>
                        :
                        <button
                        onClick={()=>{likePost(props._id)}}
                        style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}>Like</button>
                        }
                    <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./before-pin-icon.png"/></button>
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
                    {props.comments.reverse().map(renderComment)}
                </div>
            </div>
            )
            })}
        </div>
    );
}

export default Posts;
