const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    senderId:{type: mongoose.Schema.Types.ObjectId,required:true},
    receiverId:{type: mongoose.Schema.Types.ObjectId,required:true},
    mergeId:{type: String,required:true},
    message:{type: String},
    media:{type: String},
    mediaType:{type: String},

isSeen:{type: Boolean,default:false},
    
},{timestamps:true})

    

module.exports=mongoose.model('Chat',chatSchema)