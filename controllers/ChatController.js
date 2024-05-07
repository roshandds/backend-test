const chatSchema = require("../modals/chatModal");

async function sendMessage(data) {
  console.log('sendmessageworks')
  if (!data.message) {
    return;
  }
  try {
    let messageObj = await chatSchema.create({ ...data, message: data.message });
    console.log(messageObj, "sendMessage");
    return messageObj;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}


async function isReceiverOnline (receiverId) {
  const receiver = await User.findById(receiverId);
  return receiver.isOnline;
};


exports.getMessage=async()=>{
try{
  const messages = await chatModel.find({ mergeId });
console.log(messages);
return messages;
}catch(error){
  console.log(error.message)

}
}


// exports.updateStatus = async (status, id) => {
//   await User.findByIdAndUpdate(id, { isOnline: status }, { new: true });
// };



exports.jonid=async(senderId,receiverId)=>{
  try{
    const merged=[senderId,receiverId]
    console.log(merged)
    merged.sort().join(',')
    console.log(merged)
    return merged;
  }catch(error){
    console.log(error.message)
  }
}



module.exports = sendMessage,isReceiverOnline;