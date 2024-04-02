const express = require("express");
const router = express.Router();
const messageController = require("../Controller/Message");
router.post("/", messageController.createMessage);
router.get("/getById", messageController.getMessage);
router.get("/", messageController.getMessages);
router.delete("/", messageController.deleteMessage);

module.exports = router;
