import React,{useState} from 'react';
import contests from './ContestData';
import {List} from 'react-virtualized';

var messages;
function displayContest(props){
    return(
            <button className="contestButton">
                {props.name}
            </button>
    );
}

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
                {messages[index].sender}
            </p>
            <p className="message">
                {messages[index].message}
            </p>
            <p className="time">
                {messages[index].time}
            </p>
        </div>
    );
}

function ContestPage(props){
    const [currentContest, setCurrentContest]= useState(0);
    messages=contests[currentContest].chat;
    const props1=(contests[currentContest].chat);
    return(
        <div>
            <div className="contestantListSection">
                <button 
                    className="contestButton" 
                    style={{color:"green"},{fontStyle:"italic"}}>
                        Create Contest
                </button>
                {contests.map(displayContest)}
            </div>
            <div className="chatSection" >
                <div>

                </div>
                <div className="chatBox">
                    <div className="chatWindow">
                        <List
                            width={698}
                            height={500}
                            rowCount={contests[currentContest].chat.length}
                            rowHeight={100}
                            rowRenderer={messageRenderer}
                        />
                    </div>
                    <input 
                        style={{height:"30px"},{width:"650px"}} 
                        placeholder="Type your message here!!" 
                        type="text" id="message"/>
                    <button className="icon" >
                        <img 
                            style={{height:"20px"},{width:"20px"}} 
                            src="./send-icon.png"/>
                    </button>
                </div>
                <div style={{position}}>
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

                </div>
            </div>
        </div>
    );
}

export default ContestPage;