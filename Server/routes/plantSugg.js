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
 	let flag =1;
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
			console.log("Inside");
			const temper = json['data'][0]['soil_temperature'];
		const moist = json['data'][0]['soil_moisture'];
		 Plant.find({type:{$in :requ.body.type}})
		.then(function(result) {
			var arr=[];
			var i;
			for(i of result)
			{
			if((i.temp <= temper + 5 && i.temp >= temper-5))
			{
				if((i.water - (requ.body.water+(moist/100*5)))<=3)
				{
					var pl = (i.manure + i.maintenance)/2;
					var gl = (requ.body.manure + requ.body.maintenance)/2;
					if(gl>= pl-2)
					{
						flag = 0;
						arr.push(i);
					}
				}
			}
		}
		if(flag==0)
		{
			resu.json({result:arr});
		}else
		{
			resu.json({error:"We are not able to satisfy your requirements"});
		}
			 
      })
      .catch(function(err) {
        resu.status(422).json({error: err});
      });

     
 	 }else
		{
			Plant.find({type:{$in :requ.body.type}})
		.then(function(result) {
			var arr=[];
			var i;
			for(i of result)
			{
			
				if((i.water - (requ.body.water))<=3)
				{
					var pl = (i.manure + i.maintenance)/2;
					var gl = (requ.body.manure + requ.body.maintenance)/2;
					if(gl>= pl-2)
					{
						flag = 0;
						arr.push(i);
					}
				}
			
		}
		if(flag==0)
		{
			resu.json({result:arr});
		}else
		{
			resu.json({error:"We are not able to satisfy your requirements"});
		}
			 
      })
      .catch(function(err) {
        resu.status(422).json({error: err});
      });
		}

	});
});

req.end();
})
//console.log(temper)



module.exports = router
