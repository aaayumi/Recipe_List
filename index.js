const express = require('express');


const app = express();

// Use static file from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req,res) => {
	res.json("hello")
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
});

module.exports = app;