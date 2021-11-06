const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
	res.status(200).json({message: "Hello client side, this is the server speaking"})
});


module.exports = router;