const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const call = require("./routes/test");
const path = require("path");
const socketio = require('socket.io');
const cors = require('cors');


//database configuration
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true, useUnifiedTopology: true,
	useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


//cors & bodyparser middleware
const allowCrossDomain = (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}
app.use(allowCrossDomain);
app.use(cors());

app.use("/api", call);

//port configuration
const port = process.env.PORT || 5000;
const expressServer = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

const io = socketio(expressServer, {
	cors: {
		origin: "*"
	}
});

app.set('socketio', io);
console.log('Socket.io listening for connections');

io.on("connection", (socket) => {
	console.log("a user has connected");
	
	socket.on("addUser", (userId) => {
		res.status(200).json({message: "sending from the adduser function"});
	});
});

if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	// index.html for all page routes html or routing and naviagtion
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "index.html"));
	});
}