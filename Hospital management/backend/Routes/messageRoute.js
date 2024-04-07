const express = require("express");
const router = express.Router();
const messageController = require("../Controller/Message");
router.post("/createmessage", messageController.createMessage);
router.get("/getbyid", messageController.getMessage);
router.get("/getmessages", messageController.getMessages);
router.delete("/deletemessage", messageController.deleteMessage);

module.exports = router;
