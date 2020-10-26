import React from 'react';

function MyPlantsPage(props)
{
  return (
    <div>
      <div className="addPlant">
        <input placeholder="Plant Name"/>
        <input type="file"/>
        <button>➕</button>
      </div>
      <div className="plantHolder">
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
        <div className="plantCard">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/peace-lily-best-indoor-plants-1582227410.jpg?crop=0.8292517006802721xw:1xh;center,top&resize=480:*" />
          <button>🗑</button>
          <h4>Plant name</h4>
          <p>12th June</p>
        </div>
      </div>
    </div>


  );
}

export default MyPlantsPage;
