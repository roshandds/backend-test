const chatSchema = require("../modals/chatModal");

exports.sendMessage = async (data) => {
  if (!data.message) {
    return;
  }
  let messageObj = await chatModel.create({ ...data, message: data.message });

  console.log(messageObj, "sendMessage");
  messageObj.save();
};

