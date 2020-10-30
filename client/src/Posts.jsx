import React from 'react';

function renderComment(props){
return(
    <div style={{marginBottom:"0px"}}>
        <p style={{marginBottom:"0px"}} ><strong>{props.name}</strong>  {props.comment}</p>
    </div>
);
}

function createPost(props){
    console.log(props);
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
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
            </div>
            <div style={{marginTop:"-40px"}}>
            <p style={{float:"right"}}>&nbsp;&nbsp;&nbsp;<strong>{props.likes.length}</strong> likes </p>
            <p style={{float:"right"}}><strong>{props.comments.length}</strong> comments</p>
            </div>
            <div style={{marginBottom:"5px"}}>
                {props.comments.reverse().map(renderComment)}
            </div>
        </div>
    );
}

function Posts(props){
    return(
        <div>
            {props.data.reverse().map(createPost)}
        </div>
    );
}

export default Posts;