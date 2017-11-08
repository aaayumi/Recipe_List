const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true}));

var db

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://Recipe:recipebox@ds125914.mlab.com:25914/ayumi', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(4000, () => {
    console.log('listening on 4000')
  })
})

app.get('/result', (req, res) => {
	db.collection('recipe').find().toArray((err, results) => {
    if(err) return console.log("no recipe");
    res.json({ results });
});
});
