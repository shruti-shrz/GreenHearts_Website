import React from 'react';

function renderComment(props){
return(
    <div style={{marginBottom:"0px"}}>
        <p style={{marginBottom:"0px"}} ><strong>{props.name}</strong>  {props.comment}</p>
    </div>
);
}

function createPost(props){
    return(
        <div className="postCard">
            <div>
                <div>
                <img className="profilePhoto" src={props.profile} alt="the profile photo"/>
                <h3>{props.name}</h3>
                </div>
            </div>
            <img src={props.img} alt="the posted image"/>
            <p>"Hrdldfngdlbjv j</p>
            <div style={{marginBottom:"10px"}}>
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
                <button style={{float:"right"},{border:"10px solid white"},{height:"15px"},{width:"8%"}}><img style={{height:"15px"},{width:"15px"}} src="./superb-icon.png"/></button>
            </div>
            <div style={{marginTop:"-40px"}}>
            <p style={{float:"right"}}>&nbsp;&nbsp;&nbsp;<strong>{props.likes}</strong> likes </p>
            <p style={{float:"right"}}><strong>{props.comments.length}</strong> comments</p>
            </div>
            <div style={{marginBottom:"5px"}}>
                {props.comments.map(renderComment)}
            </div>
        </div>
    );
}

function Posts(props){
    return(
        <div>
            {props.data.map(createPost)}
        </div>
    );
}

export default Posts;