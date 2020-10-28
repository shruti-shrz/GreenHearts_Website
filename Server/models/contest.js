const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const contestSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	comments:[{
		text:String,
		photo:String,
		time:String,
		postedBy:{type:ObjectId,ref:"User"}
	}],
	createdBy:
	{
		type:ObjectId,
		ref:"User"
	}
})

mongoose.model("Contest",contestSchema)