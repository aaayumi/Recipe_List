module.exports = function(app, db){

app.get('/recipe', (req,res)=> {
  db.collection('recipe').find().toArray((err, results) => {
    if(err) return console.log("no recipe");
    res.json(results);
  })
})

app.post('/recipe', (req, res) => {
  // log the body of the request, to make sure data is properly passed
  console.log(req.body);
  // use mongodb's insertOne instead of the deprecated save
  db.collection('recipe').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database')
    // log the result of db insertion
    // send the freshly saved record back to the front-end
    res.json(result);
  });
});


app.delete('/recipe', (req,res)=>{
  console.log(req.body)
  db.collection('recipe').findOneAndDelete({name: req.body.name},
    (err,result)=> {
      if(err) return res.send(500, err)
      res.send({ message: "Recipe is deleted"})
    })
})

};