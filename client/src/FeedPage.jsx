import React from 'react';
import Posts from './Posts'

const filterOptions=['All', "My", "Following", "Pinned"];
function FeedPage(){
    return(
        <div style={{alignContent: "center"}}>
            <div className="filterSection">
                <input type="checkbox" id="all"/>
                <label for="all">All Posts</label>
                <br/>
                <input type="checkbox" id="my"/>
                <label for="my">My Posts</label>
                <br/>
                <input type="checkbox" id="following"/>
                <label for="following">Following Posts</label>
                <br/>
                <input type="checkbox" id="pinned"/>
                <label for="pinned">Pinned Posts</label>
                <br/>
            </div>
            <div className="postSection">
                <div className="postTemplate">
                    <button style={{background:"white"},{border:"0px"}}><img style={{height:"20px"},{width:"20px"}} src="./camera-icon.png"/></button>
                    <input style={{width:"500px"}} placeholder="Type your message here!!" type="text" id="message"/>
                    <button style={{background:"white"},{border:"0px"}}><img style={{height:"20px"},{width:"20px"}} src="./send-icon.png"/></button>
                </div>
                <Posts/>
            </div>
        </div>
    );
}

export default FeedPage;