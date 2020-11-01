const mongoose = require('mongoose')
const User = mongoose.model("User")
const {ObjectId} = mongoose.Schema.Types
const contestSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	contestants:[{
		user:String,
		 score:Number,
		 no_tress:Number
	}],
	comment_contest:[{
		text:String,
		photo:String,
		time:String,
		sentBy:String
	}],
	createdBy:
	{
		type:ObjectId,
		ref:"User"
	}
})

mongoose.model("Contest",contestSchema)