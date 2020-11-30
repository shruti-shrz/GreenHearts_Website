# GreenHearts_Website
A web app to encourage people to get involve in gardening and spread awareness by making posts. This app provides a competitive platform for plant lovers to showcase their gardening skill by 
participating in the contest and answering questions in general feed. Queries and advice can be posted on the feed. Users can stay connected with their fellow contestants 
through contest chat, search about different plant, get suggestion of plants based on the user location and interest and monitor health of their garden through water meter and mood of the plant. Website Link: https://greenheart-webapp.herokuapp.com/

## Dependencies
### Server
- NPM (6.14.8)
- Express (14.7.1)
- Mongoose (5.10.9)
- Nodemon (2.0.6)
- bcryptjs (2.4.3)
- stemmer (1.0.5)
- node-fetch (2.6.1)

### Client
- React (17.0.0)
- styled-components (5.2.0)
- material-ui (v4)


## Installation
To install this project first clone this repo into the system. Make sure you have all dependencies installed in the system and have stable internet. To run web app first we will start server side and then parallely will start client side.


Start Server-side
```sh
$ cd GreenHearts
$ cd Server
$ node app.js
```

Start Client-side
```sh
$ cd GreenHearts
$ cd Server
$ cd client
$ npm install
$ npm start
```
Web-app can be access at ```localhost:3000```

## Features
- ``Everyday tip`` for the user.
- ``Contest Room`` to create contest, add contestants and leave contest.
- ``Leaderboard`` to show rank of the participants based on the daily plant maintenance(Questionnaire).
- ``Chatroom`` for each contest for participants to interact.
- Everyday ``Questionnaire`` to keep track of maintenance of the garden.
- ``General feed`` to share thoughts by making posts, pin post, like post and comments for post.
- ``Filter`` to get feeds based on your interest.
- ``Followers`` and ``Following`` feature for the users.
- ``Add Plant`` in profile to create own plant gallery and score more in the contest.
- ``Water Meter`` and ``talking plant`` to keep track of health of the plants.
- ``Plant info`` to get information related to requirements and mainteanance of a particular plant.
- ``Plant Suggestor`` to get suggestions of the plants based on the user interest and current location soil temperature and soil moisture.

## How to Contribute
Fork this repository, then clone it into your system.
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



