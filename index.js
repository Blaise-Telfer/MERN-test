const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const call = require("./routes/test");
const path = require("path");


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

app.use("/api", call);

//port configuration
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Set static folder
	app.use(express.static("client/build"));
	
	// index.html for all page routes html or routing and naviagtion
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
