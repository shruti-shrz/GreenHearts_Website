import React from 'react';
import data from './PostsData';

function createPost(props){
    return(
        <div className="postCard">
            <div>
                <img src={props.profile} alt="the profile photo"/>
                <h3>{props.name}</h3>
            </div>
            
            <img src={props.img} alt="the posted image"/>
            <p>{props.likes} likes</p>
        </div>
    );
}

function Posts(){
    return(
        <div>
            {data.map(createPost)}
        </div>
    );
}

export default Posts;