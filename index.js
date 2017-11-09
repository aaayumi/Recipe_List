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
  app.listen(8080, () => {
    console.log('listening on 8080')
  })
})

app.get('/api', (req,res)=> {
  db.collection('recipe').find().toArray((err, results) => {
    if(err) return console.log("no recipe");
    res.json(results);
  })
})

app.post('/recipe', (req,res)=>{
	db.collection('recipe').save(req.body, (err, result) => {
		if(err) return console.log(err);
    console.log(req.body)
		console.log('save to database');
		res.redirect('/');
	})
})


app.delete('/recioe', (req,res)=>{
  db.collection('recipe').findOneAndDelete({name: req.body.name},
    (err,result)=> {
      if(err) return res.send(500, err)
      res.send({ message: "Recipe is deleted"})
    })
})