const express = require('express');
const path = require('path')
const app = express();

// Use static file from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req,res) => {
	res.json("hello")
	console.log("hi")
})

// if request does not match, return React's index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});

module.exports = app;