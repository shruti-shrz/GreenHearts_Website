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
			//var obj =  {user:req.user,score:req.user.score,no_trees:req.user.numplants}
			console.log(req.user)
			const contest = new Contest({
				title,
				contestants:[{user:req.user.name,score:req.user.score,no_trees:req.user.numplants}],
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
	Contest.find({_id:req.user.contest})
	.populate("createdBy","name")
	.then(mycontests=>{
		res.json({mycontests})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/searchcontestant',requireLogin,(req,res)=>{
	const pattern = new RegExp("^"+ req.body.query);

 User.find({name: req.user.name})
 .populate("user.followers", "name")
 .find({name:{$regex :pattern}})
    .then(function(user) {
    	
    	console.log(user)
      res.json({user: user});
    })
    .catch(function(err) {
      console.log(err);
    });
})

router.put('/addcontestant',requireLogin,async (req,res)=>{
	let flag=1;
  let no_trees =0;
  let users;
  try {
    users = await User.findOne({_id:req.body.followId},{contest:req.body.contestId})
    if(users){
      flag=0
      return res.status(422).json({error: "Contestant Already Exist"});
    }
    let result;
    let result1;
    if(!flag){
      result = await User.findByIdAndUpdate(req.body.followId,
      	{$push: {contest: req.body.contestId}
      },{new:true});
      result1 = await Contest.findByIdAndUpdate(req.body.contestId,
      	{$push: {contestants: {user:result.name,score:result.score,no_trees:result.numplants}}
      },{new:true});
    }
    res.json(result1);
  } catch (error) {
    res.json(error)
  }
})
// router.put('/addcontestant',requireLogin,(req,res)=>{
// 	let flag=1;
// 	let no_trees =0;
// 	User.findOne({_id:req.body.followId},{contest:req.body.contestId},function(err2,result2){
// 		if(!err2)
// 		{
// 			if(result2)
// 			{
// 				flag=0;
// 			console.log("Exist")
// 			return res.json({error: "Contestant Already Exist"});
// 			}
			
// 		}
// 	})
	

// 	if(flag===1)
// 	{
// 		User.findByIdAndUpdate(req.body.followId,{
// 		$push: {contest: req.body.contestId}
// 	},{new:true},function(err,result){
// 		if(err) {
//         return res.status(422).json({error: err});
//     }
//     Contest.findByIdAndUpdate(req.body.contestId,{
//     	$push: {contestants: {user:result.name,score:result.score,no_trees:result.numplants}}
//     },{new:true})
//     .then(function(result1) {
//           res.json({result: result});
//       })
//       .catch(function(err1) {
//         res.status(422).json({error: err1});
//       });
// 	})
	
// 	}
	
// })

router.put('/leavecontest',requireLogin,(req,res)=>{
	Contest.findByIdAndUpdate(req.body.contestId,{
		//let obj2 =  {user:req.user,score:0,no_trees:req.user.numplants}
		$pull: {contestants: {user:req.user.name}}
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

router.put('/contest_comment',requireLogin,(req,res)=>{
	var d = new Date();
    var n = d.getHours();
    var n2 = d.getMinutes();
	const comment = {
		text: req.body.text,
		photo: req.body.photo,
		time: n+":"+n2,
		sentBy:req.user.name
	}
 	Contest.findByIdAndUpdate(req.body.contestId,{
 		$push:{comment_contest:comment}
 	},{
 		new:true
 	})
 	//.populate("comment_contest.sentBy")
 	.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })

router.post('/accessquestion',requireLogin,(req,res)=>{
	var n = req.user.response
	var d = new Date();
	var n2 = (((d.getMonth()+1)*31 + d.getDate())*24 + d.getHours())*60 + d.getMinutes();
	let allowAccess=0;
	let response=n;
	if(n==0)
	{
		allowAccess = 1;
		response = n2;
	}else
	if((n2-n)>=1440)
	{
		allowAccess = 1;
		response = n2;
	}
	
          res.json({result: allowAccess});


})


router.post('/submitquestion',requireLogin,(req,res)=>{
	var n = req.user.response
	var d = new Date();
	var n2 = (((d.getMonth()+1)*31 + d.getDate())*24 + d.getHours())*60 + d.getMinutes();
	let allowAccess=0;
	let response = n2;
	User.findByIdAndUpdate(req.user._id,{
		allowAccess:allowAccess,
		response:response
	},{new:true})
	.then(function(result1) {
          res.json({result: result1});
      })
      .catch(function(err1) {
        res.status(422).json({error: err1});
      });
})
router.post('/questionnaire',requireLogin,(req,res)=>{
	 var g_score = req.user.score + req.user.numplants*req.body.no_y +1
	 //console.log(prv_score)
	User.findByIdAndUpdate(req.user._id,{
		score:g_score
	},{new:true})
	.then(function(result1) {
		Contest.findByIdAndUpdate(result1.contest,{
			$pull: {contestants: {user:req.user.name}}
		//	$push: {contestants: {user:req.user.name,score:g_score,no_trees:req.user.numplants}}
		},{new:true})
		    .then(function(result2) {
		    	Contest.findByIdAndUpdate(result1.contest,{
				$push: {contestants: {user:req.user.name,score:g_score,no_trees:req.user.numplants}}
			//	$push: {contestants: {user:req.user.name,score:g_score,no_trees:req.user.numplants}}
				},{new:true})
				.then(function(result3){
					res.json({result: result3});
				})
				.catch(function(err3) {
			      res.status(422).json({error: err3});
			      });

		      })
		      .catch(function(err1) {
		        res.status(422).json({error: err1});
		      });
      })
      .catch(function(err2) {
        res.status(422).json({error: err2});
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
router.put('/leaderboard',requireLogin,(req,res)=>{
	
	var query = User.find({contest:req.body.contestId}).select('_id name score numplants url');
				
	query
	.sort({score: -1})
	.exec((err,result)=>{
		if(err)
			return res.status(422).json({error:err})
		else
		res.json(result)
	})
	
})
module.exports = router
