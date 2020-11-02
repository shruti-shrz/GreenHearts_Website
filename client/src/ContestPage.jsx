import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {List} from 'react-virtualized';

var messages;
function ContestPage(props){

    const [contestName, setcontestName] = useState("");
    const [contests, setcontests] = useState([]);
    const [currentContest, setCurrentContest]= useState(0);
    const [message, setmessage] = useState("")
    const [userName, setuserName] = useState("")
    const [leader, setleader] = useState([])

    //const [messages, setmessages] = useState([]);
    if(contests.length>0)
    messages=contests[currentContest].comment_contest;

    function messageRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
      }){
        return(
            <div key={key} style={style} className="chatCard">
                <p className="sender">
                    {messages[index].sentBy}
                </p>
                <p className="message">
                    {messages[index].text}
                </p>
                <p className="time">
                    {messages[index].time}
                </p>
            </div>
        );
    }

    const sendMessage=(message,id)=>{
        fetch("/contest_comment",{
            method:"put",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                text:message,
                photo:"default",
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
              console.log("created")
              console.log(data)
             if(data.error)
             {
                 M.toast({html: data.error})}
             else
             {
               M.toast({html: "Created!!"})
               setcontestName("")
               //setcontests([{data},...contests])
             }
          });
    }
    
    const searchContestant=(name)=>{
        fetch("/searchcontestant",{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                query:name
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
                setuserName("")
                if(data.user.length>0)
                addContestant(data.user[0]._id,contests[currentContest]._id)
                else
                M.toast({html: "couldn't find user!!"})
              }
          });
    }

    const addContestant=(userID,contestID)=>{
        console.log("we are here")
        console.log(contestID)
        console.log(userID) 
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
              console.log("hellllllo")
              console.log(data)
              setCurrentContest(0);
            if(data.error)
            { M.toast({html: data.error})}
            else
            {M.toast({html: "Created!!"}) }
          });
    }

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
    },[messages ])


    return(
        <div>
            <div className="contestantListSection" style={{boxShadow:"0px 0px 5px gray"},{paddingTop:"5px"}} >
            <input 
                    //className="contestButton"
                    style={{border:"10px solid black"},{size:"15px"},{padding:"5px"},{marginBottom:"-5px"},{marginLeft:"30px"}}
                    onChange={(event)=>{
                        setcontestName(event.target.value);
                    }}
                    type="text" placeholder="Enter contest name"></input>
                <div className="contestantListSection" style={{width:"65%"}}>
                    <button 
                        onClick ={()=>{
                        createContest(contestName)
                        }}
                        className="contestButton" 
                        style={{color:"green"},{fontStyle:"italic"}}>
                            Create Contest
                    </button>
                </div>
                <text style={{marginBottom:"-20px"},{marginLeft:"60px"}}><u><strong>Your Contests</strong></u></text>
                <div className="contestantListSection" style={{width:"65%"}}>
                    {contests.map((props,index)=>{
                        return(
                            <button
                            onClick={()=>{
                                setCurrentContest(index);
                            }}
                            className="contestButton">
                                {props.title}
                            </button>
                    );
                    })}
                </div>
            </div>
            
            {contests.length >currentContest
            ?
            <div>
                <h1 style={{marginBottom:"-5px"}}>{contests[currentContest].title}</h1>
            <div className="chatSection" >
                <div className="chatBox">
                    <div className="chatWindow">
                        <List
                            width={698}
                            height={500}
                            rowCount={contests[currentContest].comment_contest.length}
                            rowHeight={100}
                            rowRenderer={messageRenderer}
                        />
                    </div>
                    <input 
                        onChange={(event)=>{
                            setmessage(event.target.value);
                        }}
                        style={{height:"30px"},{width:"650px"}} 
                        placeholder="Type your message here!!" 
                        type="text" id="message"
                        value={message}/>
                    <button 
                    onClick={()=>{
                        sendMessage(message,contests[currentContest]._id)
                    }}
                    className="icon" >
                        <img 
                            style={{height:"20px"},{width:"20px"}} 
                            src="./send-icon.png"/>
                    </button>
                </div>
                
            </div>
            <div className="leaderBoardSection">
                <div>
                    <h2 style={{textAlign:"center"}}>Leader Board</h2>
                    <text style={{textAlign:"center"},{marginBottom:"-60px"},{marginLeft:"83px"}}>User name &nbsp;&nbsp; Score</text>
                </div> 
                {leader.map(contestant=>{
                   return(
                    <h5 className="lbRow"><strong>{contestant.name}</strong>&nbsp;&nbsp;&nbsp;{contestant.score}</h5>
                   );
               })}
            </div>
            <div style={{marginTop:"-200px"}}>
            <div style={{width:"220px"},{marginLeft:"40px"}}>
                    <input 
                        onChange={(event)=>{
                            setuserName(event.target.value);
                        }}
                        style={{height:"30px"},{width:"220px"}} 
                        placeholder="enter username... " 
                        type="text" id="userName"
                        value={userName}/>
                    <br></br>
                    <button
                    onClick={()=>{
                        searchContestant(userName);
                    }}
                    
                    className="addContestant">
                            Add Contestant
                    </button>
                    <button 
                     onClick={()=>{
                         removeContestant(contests[currentContest]._id)
                    }}
                    className="exitContest">
                            Exit Contest
                    </button>
                </div>
            </div>
            </div>
            :
            <h1>nothing to display</h1>
        }
        </div>
    );
}

export default ContestPage;