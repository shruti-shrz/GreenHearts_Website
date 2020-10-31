import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {List} from 'react-virtualized';



function FollowCards(props)
{
  console.log(props.userd);
  var fcards=[];

  function rowRenderer({
                            key, // Unique key within array of rows
                            index, // Index of row within collection
                            isScrolling, // The List is currently being scrolled
                            isVisible, // This row is visible within the List (eg it is not an overscanned row)
                            style, // Style object to be applied to row (to position it)
                          }) {
                            return (
                              <div key={key} style={style} className="fCard">
                                <img src={fcards[index].url} alt="ProfilePic" />
                                <p>{fcards[index].name}</p>
                              </div>
                            );
                          }

    if(props.userd.name !=="")
    {
      if(props.folltype === "Followers")
      {
          fcards=props.userd.followers
      }
      else
      {
          fcards=props.userd.following
      }
    }
      console.log("yo")
      console.log(fcards)
/*
<List
width={300}
height={300}
rowCount={fcards.length}
rowHeight={60}
rowRenderer={rowRenderer}
/>
*/
  return (
    <List
    width={300}
    height={300}
    rowCount={fcards.length}
    rowHeight={60}
    rowRenderer={rowRenderer}
    />
  );
}

export default FollowCards;
