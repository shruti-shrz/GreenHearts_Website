import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {List} from 'react-virtualized';
import contests from './ContestData';

var messages;
function ContestPage(props){

    const [contestName, setcontestName] = useState("");
    const [contests, setcontests] = useState([]);
    const [currentContest, setCurrentContest]= useState(0);
    const [message, setmessage] = useState("")
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
                    {messages[index].postedBy}
                </p>
                <p className="message">
                    {messages[index].text}
                </p>
                <p className="time">
                    {messages[index].photo}
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
           console.log(result);
            //   const newData =data.map(item=>{
            //       if(item._id==result._id){
            //           return result;
            //       }
            //       else{ 
            //         return item; 
            //       }
            //   })
            //   setdata(newData);
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
    
    useEffect(()=>{
        fetch('/mycontest',{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
              console.log("result hre")
            console.log(result)
            setcontests(result.mycontests)
          });
    },[])


    return(
        <div>
            <div style={{float:"left"}}>
                <div className="contestantListSection">
                <input 
                    className="contestButton"
                    style={{border:"10px solid black"},{width:"100%"},{size:"15px"},{padding:"5px"}}
                    onChange={(event)=>{
                        setcontestName(event.target.value);
                    }}
                    type="text" placeholder="contest name"></input>
                    <button 
                        onClick ={()=>{
                        createContest(contestName)
                        }}
                        className="contestButton" 
                        style={{color:"green"},{fontStyle:"italic"}}>
                            Create Contest
                    </button>
                </div>
                <div className="contestantListSection">
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
                <h1>{contests[currentContest].title}</h1>
            <div className="chatSection" >
                <div>

                </div>
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
                        sendMessage(message,contests.[currentContest]._id)
                    }}
                    className="icon" >
                        <img 
                            style={{height:"20px"},{width:"20px"}} 
                            src="./send-icon.png"/>
                    </button>
                </div>
                <div style={{position:"relative"}}>
                    <button className="addContestant">
                            Add Contestant
                    </button>
                    <button className="exitContest">
                            Exit Contest
                    </button>
                </div>
            </div>
            <div className="leaderBoardSection">
                <div>
                    <h2 style={{textAlign:"center"}}>Leader Board</h2>
                </div> 
                {contests[currentContest].contestants.map(contestant=>{
                   return(
                    <h5 className="lbRow"><strong>{contestant.user}</strong>&nbsp;&nbsp;&nbsp;{contestant.score}</h5>
                   );
               })}
            </div>
            </div>
            :
            <h1>nothing to display</h1>
        }
        </div>
    );
}

export default ContestPage;