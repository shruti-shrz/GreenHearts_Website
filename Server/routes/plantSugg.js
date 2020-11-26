const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Contest = mongoose.model("Contest")
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')
const fetch = require('node-fetch')

router.post('/api',requireLogin,(req,res)=>{

	const {lan,lat} = req.body;

})

router.get('/plantSuggest/:latlon',async (requ,reu)=>{
	 const latlon = requ.params.latlon.split(',');
	 const lat = latlon[0];
	 const lon = latlon[1];
	// const api_url = `https://api.ambeedata.com/soil/latest/by-lat-lng?lat=${lat}&lng=${lon}`
	// const fetch_response = await fetch(api_url);
	// const json = await fetch_response.json();
	// console.log(json);
	// res.json(json);
	const http = require("https");
	const l = 12.9889055
	const m = 77.574044

const options = {
	"method": "GET",
	"hostname": "api.ambeedata.com",
	"port": null,
	"path": "/soil/latest/by-lat-lng?lat="+l.toString()+"&lng="+m.toString(),
	"headers": {
		"x-api-key": "JlFnNmzjbH8dX9TYo3GRsa0tCXpmEau72cxomuFl",
		"Content-type": "application/json"
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		const json = JSON.parse(body.toString());
		const temper = json['data'][0]['soil_temperature'];
		const moist = json['data'][0]['soil_moisture'];
		console.log(temper)
		console.log(moist)
		Plant.find({requ.body.type})
		.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
	});
});

req.end();
	
})

module.exports = router