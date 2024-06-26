const chatSchema = require("../modals/chatModal");

async function sendMessage(data) {
  if (!data.message) {
    return;
  }
  try {
    let messageObj = await chatSchema.create({ ...data, message: data.message });
    console.log(messageObj, "sendMessage11111111");
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


async function getMessage(mergeId) {
  console.log("mergeidinfunction")

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



module.exports = {sendMessage,isReceiverOnline, getMessage};