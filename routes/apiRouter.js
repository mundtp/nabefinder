let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let querystring = require('querystring')
let request = require('request')

let User = require('../db/schema.js').User
let Nabe = require('../db/schema.js').Nabe //STEP THREE (import schema)


  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err)
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err)
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err)
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

    // Routes for a Model(resource) should have this structure

//STEP FOUR (build your server side apiroutes)

//this route will create a brand new neighborhood that we will put in the db
apiRouter.post('/neighborhoods', function(request, response) {
    let nabe = new Nabe(request.body) //create new instance of schema from a MONGOOSE model, request.body is all the information that we have taken from the client side and we send it on the body of the request to the server
    nabe.save(function(error) { //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(nabe)
        }
    })
})

apiRouter.put('/neighborhoods/:_id', function(request, response) {
    Nabe.findByIdAndUpdate(request.params._id, request.body,function(error,records){ //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

//this route will show us all the neighborhoods posted by all users
apiRouter.get('/neighborhoods', function(request, response) {
    Nabe.find(request.query, function(error, records){  //some methods live directly on the model, so you don't need to create a new instance.
    // request.query parses the parameters and turns them into an object (at this moment we have it just in case)
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

//get neighborhoods posted by the logged in user
apiRouter.get('/user/neighborhoods', function(request, response) {
    Nabe.find({authorId: request.user._id}, function(error, records) { //I want to get all neighborhoods where the author id matches the current id of the user
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

apiRouter.delete('/neighborhoods/:_id', function(req, res){
      Nabe.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

apiRouter.get('/zillow', function(req,res) {
  var params = querystring.stringify(req.query)
  params += '&zws-id=X1-ZWz19n3fjh3guj_7x5fi'

  var url = 'http://www.zillow.com/webservice/GetSearchResults.htm?' + params
  request(url,(err,response2,body)=>{
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.send(body)
    }
  })


})

apiRouter.get('/distance', function(req,res) {
  var params = querystring.stringify(req.query)
  params += '&key=AIzaSyC8WtzWw9giW8mJYOT6-xuSPOYmSrYr-FM'
  
  var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&' + params
  request(url,(err,response2,body)=>{
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.send(body)
    }
  })


})

module.exports = apiRouter