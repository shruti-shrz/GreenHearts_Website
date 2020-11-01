const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Contest = mongoose.model("Contest")
const User = mongoose.model("User")
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
			var obj =  {user:req.user,score:req.user.score,no_trees:req.user.numplants}
			const contest = new Contest({
				title,
				contestants:[obj],
				createdBy:req.user

			})
			contest.save().then(res2=>{
				User.findByIdAndUpdate(req.user._id,{
					$push:{contest:contest._id},
				},{
					new:true
				}).then(res1=>{
					res.json({contest:result})
				})
				
			})
			.catch(err=>{
				console.log(err)
			})
			console.log(contest._id)
		}
		
	})
})

router.get('/mycontest',requireLogin,(req,res)=>{
	console.log(req.user.contest)
	Contest.find({_id:req.user.contest})
	.populate("createdBy","name")
	.then(mycontests=>{
		res.json({mycontests})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/searchcontest',requireLogin,(req,res)=>{
	let pattern = new RegExp("^"+ req.body.query);
  User.find({title: {$regex: pattern}})
    .then(function(user) {
      res.json({user: user});
    })
    .catch(function(err) {
      console.log(err);
    });
})

router.put('/addcontestant',requireLogin,(req,res)=>{
	let no_trees =0;
	User.findByIdAndUpdate(req.body.followId,{
		$push: {contest: req.body.contestId}
	},{new:true},function(err,result){
		if(err) {
        return res.status(422).json({error: err});
    }
    Contest.findByIdAndUpdate(req.body.contestId,{
    	$push: {contestants: {user:result,score:result.score,no_trees:result.numplants}}
    },{new:true})
    .then(function(result1) {
          res.json({result: result});
      })
      .catch(function(err1) {
        res.status(422).json({error: err1});
      });
	})
})

router.put('/leavecontest',requireLogin,(req,res)=>{
	Contest.findByIdAndUpdate(req.body.contestId,{
		//let obj2 =  {user:req.user,score:0,no_trees:req.user.numplants}
		$pull: {contestants: {user:req.user,score:req.user.score,no_trees:req.user.numplants}}
	},{new:true},function(err,result){
		if(err) {
        return res.status(422).json({error: err});
    }
    User.findByIdAndUpdate(req.user._id,{
    	$pull: {contest: req.body.contestId}
    },{new:true})
    .then(function(result1) {
          res.json({result: result});
      })
      .catch(function(err1) {
        res.status(422).json({error: err1});
      });
	})
})

<<<<<<< HEAD
router.put('/chatmessage',requireLogin,(req,res)=>{
=======
router.put('/contest_comment',requireLogin,(req,res)=>{
>>>>>>> 2dfbdf88d5d3060dcd36246d14dccba24d1b4ca4
	const comment = {
		text: req.body.text,
		photo: req.body.photo,
		postedBy:req.user._id
	}
 	Contest.findByIdAndUpdate(req.body.contestId,{
 		$push:{comment_contest:comment}
 	},{
 		new:true
 	})
 	.populate("comment_contest.postedBy","_id name")
 	.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })

router.post('/questionnaire',requireLogin,(req,res)=>{
	 var g_score = req.user.numplants*req.body.no_y +1

	User.findByIdAndUpdate(req.user._id,{
		score:g_score
	},{new:true})
	.then(function(result1) {
          res.json({result: result1});
      })
      .catch(function(err1) {
        res.status(422).json({error: err1});
      });
})

// router.get('/leaderboard',requireLogin,(req,res)=>{
// // 	Contest.load(function(err, contest) {
// //     var pl = contest.toObject();
// //     pl.contestants.sort(function(m1, m2) { return m1.score - m2.score; });
// //     // pl contains the playlist now 
// // });
// 		Contest.findOne({_id:req.body.contestId}, function(err, result){
// 			if(!err)
// 			{
// 				if(result)
// 				{	
// 					var c = result.toObject();
// 					c.contestants.sort(function(m1, m2) { return m1.score - m2.score; })

					
// 				}
// 			}
// 		})
// 	.populate("createdBy","_id name")
// 	.then(contest=>{
// 		res.json({contest})
// 	})
// 	.catch(err=>{
// 		console.log(err)
// 	})
// })
router.get('/leaderboard',requireLogin,(req,res)=>{
	User.find({contest:req.body.contestId})
	.populate("_id name")
	.then(user=>{
		res.json({user})
	})
	.catch(err=>{
		console.log(err)
	})
})
module.exports = router