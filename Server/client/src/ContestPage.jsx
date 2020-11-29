import React,{useState,useEffect} from 'react';
import M, { textareaAutoResize } from 'materialize-css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CustomizedDialogs from './schumma.jsx';

var messages;
const medals=['🥇','🥈','🥉'];
function ContestPage(props){

    const [contestName, setcontestName] = useState("");
    const [contests, setcontests] = useState([]);
    const [currentContest, setCurrentContest]= useState(0);
    const [message, setmessage] = useState("");
    const [userName, setuserName] = useState("");
    const [leader, setleader] = useState([]);
    const [image, setimage] = useState("");
    const [currentUser, setcurrentUser] = useState("");
    const [CreateError, setCreateError] = useState(false);
    const [suggestions, setsuggestions] = useState([]);
    const [addLabel, setaddLabel] = useState("Add Contestant");
    const [infouser, setInfouser] = useState({user:{name:'', url:'', followers:[], following:[]}, plants:[]});
    const [clicked, setClicked] = useState(false);

    if(contests.length>0)
    messages=contests[currentContest].comment_contest;

    //profile
    useEffect(()=>{
        fetch('/profile',{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
              console.log(result.user);
            setcurrentUser(result.user);
          });
    },[])

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
            console.log("done");
            console.log(data.url);
            sendMessage(message,data.url,contests[currentContest]._id);
            setimage("");
        })
        .catch(error=>{console.log(error);})
    }

    const sendMessage=(message,url,id)=>{
        console.log(message);
        console.log(url);
        console.log("here");
        if(!(message==="" && !url)){
        fetch("/contest_comment",{
            method:"put",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                text:message,
                photo:url,
                contestId:id
            })
          })
          .then(res=>res.json())
          .then(result=>{
           setmessage("")
           console.log("so this is the message")
           console.log(result);
            messages=result.comment_contest;
          }).catch(error=>{
            console.log(error);
        });
    }
    }

    const createContest=(name)=>{
        fetch("/createcontest",{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                title:name
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data)
             if(data.error)
             {
                 M.toast({html: data.error})
                 setCreateError(true)
            }
             else
             {
               M.toast({html: "Created!!"})
               setcontestName("")
               //setcontests([{data},...contests])
             }
          });
    }

    //suggestions
    useEffect(()=>{
        fetch("/searchcontestant",{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                query:userName
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data)
              if(data.error)
              {
                  M.toast({html: data.error})}
              else
              {
                  setsuggestions(data.user);
                }
          });
    },[userName])

    const addContestant=(userID,contestID)=>{
        fetch("/addcontestant",{
            method:"put",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                followId:userID,
                contestId:contestID
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log("hereeeee")
              console.log(data)
               if(data.error)
               {
                   M.toast({html: data.error})}
               else
               {
                 M.toast({html: "Created!!"})
               }
          });
    }

    const removeContestant=(contestID)=>{
        fetch('/leavecontest',{
            method:"put",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                contestId:contestID
            })
          })
          .then(res=>res.json())
          .then(data=>{
              setCurrentContest(0);
            if(data.error)
            { M.toast({html: data.error})}
            else
            {M.toast({html: "Bye Bye!!"}) }
          });
    }

    //myContests
    useEffect(()=>{
        fetch('/mycontest',{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
            setcontests(result.mycontests)
          });
    },[messages])

    //LeaderBoard
    useEffect(()=>{
        if(contests.length>0){
        fetch('/leaderboard',{
            method:"put",
            headers:{"Content-Type":"application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                contestId:contests[currentContest]._id
            })
          }).then(res=>res.json())
          .then(result=>{
            setleader(result)
          });
        }
    },[messages])


    function getProfile(id)
    {

      fetch("/user",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          id
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
          console.log(data.error);
        }
        else
        {
          console.log(data);
          setInfouser(data);
          setClicked(true);
        }
      });
    }

    return(
        <div style={{position:"relative"}}>
            <div className="navSection"
            style={{marginTop:contests.length >currentContest? "20px":"0px"}}>
            <TextField
                autoComplete="off"
                id="outlined-helperText"
                style={{margin:"5px"}}
                label="Enter contest name"
                height="20px"
                value={contestName}
                helperText={CreateError?"Contest already exists":""}
                variant="outlined"
                onChange={(event)=>{
                    setcontestName(event.target.value);
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick ={()=>{
                createContest(contestName)
                }}
                style={{
                    borderRadius: "8",
                    backgroundColor: "#21b6ae",
                    fontSize: "12px",
                    width: "80%",
                    marginLeft:"10%",
                    marginRight:"10%"
                }}>
                 Create Contest
            </Button>
            <h3 style={{textAlign:"center"}}>YOUR CONTESTS</h3>
            <ul>
            {contests.map((props,index)=>{
                return(
                    <li>
                        <a href="#"
                            onClick={()=>{
                                setCurrentContest(index);
                            }}>
                            <span className={index===currentContest?"selectedContest":"contestName"}>{props.title}</span>
                        </a>
                    </li>
                );
            })}
            </ul>

            </div>

            {contests.length >currentContest
            ?
            <div className="displayContest">

                <div className="heading" style={{alignItems:"center"}}>
                    <h1 style={{marginLeft:"5%"},{color:"brown"},{width:"45%"}}>{contests[currentContest].title}</h1>
                    <button style={{marginLeft:"0%"},{marginRight:"16%"}}
                     onClick={()=>{
                         removeContestant(contests[currentContest]._id)
                    }}
                    className="exitContest">
                            Exit Contest
                    </button>
                    <div style={{float:"right"},{display:"flex"}}>
                        <div >
                            <TextField
                                autoComplete="off"
                                id="outlined-helperText"
                                label={addLabel}
                                height="20px"
                                value={userName}
                                helperText={CreateError?"Contest already exists":""}
                                variant="outlined"
                                onChange={(event)=>{
                                    setuserName(event.target.value);
                                    //searchContestant(userName);
                                }}
                                onBlur={(event)=>{
                                    setaddLabel("Add Contestant");
                                }}
                                onFocus={(event)=>{
                                    setaddLabel("Search by username");
                                }}
                            />
                            {suggestions.length>0 && userName!=""?
                            <div className="suggestions">
                            <ul>
                            {suggestions.map((props,index)=>{
                                return(
                                <li>
                                    <a href="#"
                                        onClick={()=>{
                                            console.log("namaste")
                                            addContestant(props._id,contests[currentContest]._id);
                                            setsuggestions([]);
                                            setuserName("");
                                        }}>
                                            <span>{props.name}</span>
                                    </a>
                                </li>
                                );
                            })}
                            </ul>
                           </div>
                                :
                                <div></div>
                            }
                        </div>

                </div>

            </div>
                <div>
                <div className="chatSection" >
                    <div className="chatBox">
                    <div className="chatWindow">
                    {messages.map(message=>{
                        return(
                        <div className="shell">
                            <div className={currentUser.name===message.sentBy?"chatCardR":"chatCardL"}>
                            <p className="sender">
                                {message.sentBy}
                            </p>
                            {message.photo!="default" ? message.photo ? <img className="imagesent" src={message.photo} alt="the posted image"/> : <div></div> : <div></div>}

                            <p className="message">
                                {message.text}
                            </p>
                            <p className="time">
                                {message.time}
                            </p>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                    <div className="inputsection">
                        <input id="image-input" type="file" className="icon" onChange={(event)=>{
                            setimage(event.target.files[0]);
                        }} />
                        <label for="image-input">
                        <img style={{height:"20px"},{width:"20px"}} src="./camera-icon.png"/>
                        </label>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Type Something..."
                            autoComplete="off"
                            style={{width:"88%"}}
                            multiline
                            rowsMax={4}
                            value={message}
                            onChange={(event)=>{
                                setmessage(event.target.value);
                            }}
                            variant="outlined"
                        />
                        <button
                        onClick={()=>{
                            postDetails()
                        }}
                        className="icon" >
                            <img
                                style={{height:"20px"},{width:"20px"}}
                                src="./send-icon.png"/>
                        </button>
                    </div>
                </div>
                </div>
                <div className="leaderBoardSection">
                <div>
                    <h2 style={{textAlign:"center"}}>Leader Board</h2>
                </div>
                {leader.map((contestant,index)=>{
                   return(
                        <div  className="lbRow">

                            <div style={{width:"25%"},{marginLeft:"10px"},{float:"left"},{alignItems:"center"}}>
                                <Avatar style={{marginLeft:"10px"}} alt="profile" src="https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-1024x669.jpg" />
                            </div>
                            <div style={{width:"60%"}}>
                            <a style={{textDecoration:"none"}} href="#" onClick={()=>getProfile(contestant._id)}>
                                <h5 style={{margin:"0px"},{color:"lawngreen"}}>
                                    {contestant.name}
                                </h5></a>
                                <h5 style={{margin:"0px"}}>{contestant.score}</h5>
                            </div>
                            <div style={{width:"15%"},{paddingTop:"10px"}}>
                                <h5 style={{margin:"0%"}}>{index<3? medals[index]:""}</h5>
                            </div>

                        </div>
                     );
               })}
            </div>
            </div>
            </div>
            :
            <div className="displayContest">
            <h1>nothing to display</h1>
            </div>
        }
        <CustomizedDialogs userDet={infouser} clickSetter={setClicked} click={clicked} />
        </div>
    );
}

export default ContestPage;
