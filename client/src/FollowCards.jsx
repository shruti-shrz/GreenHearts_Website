import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'react-virtualized';

function MakeCard(x)
{
  return (
    <div className="fCard">
      <img src={x.url} alt="ProfilePic" />
      <p>{x.name}</p>
    </div>
  );
}

const cards=[{name:"ABC" , url:"https://library.kissclipart.com/20180906/otq/kissclipart-people-clipart-clip-art-women-clip-art-33ca5f3583e732e3.jpg" },
            {name:"DEF" , url:"https://www.vhv.rs/dpng/d/124-1243789_office-man-clipart-png-download-person-on-phone.png" },
            {name:"ghi" , url:"https://smallimg.pngkey.com/png/small/1008-10086714_person-symbol-icon-abstract-png-image-clipart-person.png" },
            {name:"ABC" , url:"https://library.kissclipart.com/20180906/otq/kissclipart-people-clipart-clip-art-women-clip-art-33ca5f3583e732e3.jpg" },
                        {name:"DEF" , url:"https://www.vhv.rs/dpng/d/124-1243789_office-man-clipart-png-download-person-on-phone.png" },
                        {name:"ghi" , url:"https://smallimg.pngkey.com/png/small/1008-10086714_person-symbol-icon-abstract-png-image-clipart-person.png" }];

function rowRenderer({
                          key, // Unique key within array of rows
                          index, // Index of row within collection
                          isScrolling, // The List is currently being scrolled
                          isVisible, // This row is visible within the List (eg it is not an overscanned row)
                          style, // Style object to be applied to row (to position it)
                        }) {
                          return (
                            <div key={key} style={style} className="fCard">
                              <img src={cards[index].url} alt="ProfilePic" />
                              <p>{cards[index].name}</p>
                            </div>
                          );
                        }

function FollowCards()
{
  return (
    <List
    width={300}
    height={300}
    rowCount={cards.length}
    rowHeight={60}
    rowRenderer={rowRenderer}
  />
  );
}

export default FollowCards;
