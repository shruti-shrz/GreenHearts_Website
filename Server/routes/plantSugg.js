const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Contest = mongoose.model("Contest")
const User = mongoose.model("User")
const Plant = mongoose.model("IPlant")
const requireLogin = require('../middleware/requireLogin')
const fetch = require('node-fetch')
const {API_KEY} = require('../config/keys');
router.post('/api',requireLogin,(req,res)=>{

	const {lan,lat} = req.body;

})

router.post('/plantSuggest/:latlon', (requ,resu)=>{
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
	"path": `/soil/latest/by-lat-lng?lat=${lat}&lng=${lon}`,
	"headers": {
		"x-api-key": API_KEY,
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
		console.log(json)
		if(json.message === 'Nearest places')
		{
			const temper = json['data'][0]['soil_temperature'];
		const moist = json['data'][0]['soil_moisture'];
		 Plant.find({type:{$in :requ.body.type}})
		.then(function(result) {
			if((result.temp <= temper + 5 && result.temp >= temper-5))
			{
				if((result.water - (requ.body.water+(moist/100*5)))<=3)
				{
					var pl = (result.manure + result.maintenance)/2;
					var gl = (requ.body.manure + requ.body.maintenance)/2;
					if(gl>= pl-1)
					{
						resu.json({result: result});
					}else
					resu.json({result: result});
				}else
				resu.json({result: result});
			}
		else
          resu.json({result: result});
      })
      .catch(function(err) {
        resu.status(422).json({error: err});
      });
		}else
		{
			Plant.find({type:{$in :requ.body.type}})
		.then(function(result) {

				if((result.water - (requ.body.water))<=3)
				{
					var pl = (result.manure + result.maintenance)/2;
					var gl = (requ.body.manure + requ.body.maintenance)/2;
					if(gl>= pl-1)
					{
						resu.json({result: result});
					}else
					resu.json({result: result});
				}else
				resu.json({result: result});
      })
      .catch(function(err) {
        resu.status(422).json({error: err});
      });
		}

	});
});

req.end();

//console.log(temper)



module.exports = router
