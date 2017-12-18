var app = require("./server/server.js");
	express = require("express");

app.use(express.static(__dirname + "/www"));	

app.listen(3000, function(err) {
	if(err) {
		return err
	}

	console.log("server started...");
})

