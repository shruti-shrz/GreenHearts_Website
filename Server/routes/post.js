const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')


router.get('/allpost',requireLogin,(req,res)=>{
	Post.find()
	.populate("postedBy","name")
	.then(posts=>{
		res.json({posts})
	})
	.catch(err=>{
		console.log(err)
	})
})
router.post('/createpost',requireLogin,(req,res)=>{
	const {title,body,photo} = req.body
	//console.log(req.body)
	if(!title||!body)
	{
		return res.status(422).json({error:"Please fill required details"})

	}
	req.user.password = undefined
	if(!photo)
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
	{
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
	}
	
})
router.get('/mypost',requireLogin,(req,res)=>{
	Post.find({postedBy:req.user._id})
	.populate("postedBy","name")
	.then(myposts=>{
		res.json({myposts})
	})
	.catch(err=>{
		console.log(err)
	})
})
 router.put('/like',requireLogin,(req,res)=>{
 	Post.findByIdAndUpdate(req.body.postId,{
 		$push:{likes:req.user._id}
 	},{
 		new:true
 	}).exec((err,result)=>{
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
 	}).exec((err,result)=>{
 		if(err){
 			return res.status(422).json({error:err})
 		}else{
 			res.json(result)
 		}
 	})
 })

module.exports = router