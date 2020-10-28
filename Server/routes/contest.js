const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Contest = mongoose.model("Contest")
const requireLogin = require('../middleware/requireLogin')

router.post('/createcontest',requireLogin,(req,res)=>{
	const {title} = req.body
	if(!title)
	{
		return res.status(422).json({error:"Please Enter Unique Contest Name"})
	}
	req.user.password = undefined
	Contest.findOne({title:title}, function(err, result){
		if(!err)
		{
			if(result)
			{
				return res.status(422).json({error: "Contest Name already exist"});
			}
			const contest = new Contest({
				title,
				contestants:[req.user._id],
				createdBy:req.user
			})
			contest.save().then(result=>{
				res.json({contest:result})
			})
			.catch(err=>{
				console.log(err)
			})
			console.log(contest._id)
		}
	})
})

module.exports = router