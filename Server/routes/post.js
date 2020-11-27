const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')


router.get('/allpost',requireLogin,(req,res)=>{
	Post.find()
	.populate("postedBy","name url")
	.populate("comments.postedBy", "_id name")
	.then(posts=>{
		res.json({posts})
	})
	.catch(err=>{
		console.log(err)
	})
})
router.get('/followingpost',requireLogin,(req,res)=>{
	Post.find({postedBy:req.user.following})
	.populate("postedBy","name url")
	.populate("comments.postedBy", "_id name")
	.then(posts=>{
		res.json({posts})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.get('/pinnedpost',requireLogin,(req,res)=>{
	User.find({_id:req.user._id})
	.populate({
		path: 'pinnedpost',

		model: 'Post',
		populate: {
			path: 'postedBy',
			model: 'User'
		}
		//populate: { path: 'pinnedpost', populate: {path:'postedBy'} }
	})
	.populate({
		path: 'pinnedpost',
		model: 'Post',
		populate: {
			path: 'comments.postedBy',
			model: 'User'
		}
	})
	.select("pinnedpost")
	.then(posts=>{
		res.json({posts})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/createpost',requireLogin,(req,res)=>{
	const {title,body,photo,tag} = req.body
	//console.log(req.body)
	if(!title||!body)
	{
		return res.status(422).json({error:"Please fill required details"})

	}
	req.user.password = undefined
	if(!tag && !photo)
	{
		console.log("check")
		const post = new Post({
		title,
		body,
		postedBy:req.user
	})
		post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err)
	})
	}
	else
	if(!tag && photo)
	{
		console.log("check")
		const post = new Post({
		title,
		body,
		photo,
		postedBy:req.user
	})
		post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err)
	})
}else
	if(!photo && tag)
	{
		console.log("check")
		const post = new Post({
		title,
		body,
		tag,
		postedBy:req.user
	})
		post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err)
	})
	}
	else
	{
		const post = new Post({
		title,
		body,
		photo,
		tag,
		postedBy:req.user
	})
		post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err)
	})
	}

})
router.get('/mypost',requireLogin,(req,res)=>{
	Post.find({postedBy:req.user._id})
	.populate("postedBy","name url")
	.populate("comments.postedBy", "_id name")
	.then(myposts=>{
		res.json({myposts})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.put('/pinpost',requireLogin,(req,res)=>{

	Post.findOne({_id:req.body.postId}, function(err,result){
		console.log(result)
		User.findByIdAndUpdate(req.user._id,{
			$push:{pinnedpost:result}
		},{
			new:true
		}).exec((err1,result1)=>{
			if(err){
 			return res.status(422).json({error:err1})
	 		}else{
	 			res.json(result1)
	 		}
		})
	})

})
router.put('/unpinpost',requireLogin,(req,res)=>{

	Post.findOne({_id:req.body.postId}, function(err,result){
		console.log(result)
		User.findByIdAndUpdate(req.user._id,{
			$pull:{pinnedpost:result._id}
		},{
			new:true
		}).exec((err1,result1)=>{
			if(err){
 			return res.status(422).json({error:err1})
	 		}else{
	 			res.json(result1)
	 		}
		})
	})

})
 router.put('/like',requireLogin,(req,res)=>{
 	Post.findByIdAndUpdate(req.body.postId,{
 		$push:{likes:req.user._id}
 	},{
 		new:true
 	})
 	.populate("comments.postedBy","_id name")
 	.populate("postedBy","_id name url")
 	.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })
 router.put('/unlike',requireLogin,(req,res)=>{
 	Post.findByIdAndUpdate(req.body.postId,{
 		$pull:{likes:req.user._id}
 	},{
 		new:true
 	})
 	.populate("comments.postedBy","_id name")
 	.populate("postedBy","_id name url")
 	.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })

router.put('/comment',requireLogin,(req,res)=>{
	const comment = {
		text: req.body.text,
		postedBy:req.user._id
	}
 	Post.findByIdAndUpdate(req.body.postId,{
 		$push:{comments:comment}
 	},{
 		new:true
 	})
 	.populate("comments.postedBy","_id name")
 	.populate("postedBy","_id name")
 	.exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })

module.exports = router
