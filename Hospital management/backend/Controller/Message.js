const messageModel = require("../Model/Message");
const createMessage = async (req, res) => {
  try {
    const message = await messageModel.create(req.body);
    res.json({
      success: true,
      message: message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const getMessage = async (req, res) => {
  try {
    const messages = await messageModel.findById(req.params.messagesId);
    res.json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find();
    res.json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const deleted = await messageModel.findByIdAndDelete(req.params.MessageId);
    res.json({
      success: true,
      message: "Message has been deleted successfully",
      message: deleted,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
};
