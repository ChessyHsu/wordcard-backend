'use strict'

// Require modules
const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID
const mongo = 'mongodb://localhost/test'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const appPort = 8080

// Set a global variable for MongoDB
let mongodb = null

app.use(bodyParser.json())

// 註冊user
app.post('/register', function (request, response) {
  const collection = mongodb.collection('users')

  collection.insert({username: request.body.username, password: request.body.password}, function (err, result) {
    if (err) return response.json(err)

    response.json({message: 'Success'})
  })
})

// 新增單字本
app.post('/wordbook', function (request, response) {
  let collection = mongodb.collection('users')

  collection.findOne({username: request.get('username')}, function (err, result) {
    if (err) return response.json(err)
    if (!result) return response.json({message: 'Error'})
    if (request.get('password') !== result.password) return response.json({message: 'Error'})

    collection = mongodb.collection('wordbook')

    collection.insert({userId: result['_id'], name: request.body.name, description: request.body.description}, function (err, result) {
      if (err) return response.json(err)

      response.json({message: 'Success'})
    })
  })
})

// 讀取單字本
app.get('/wordbook', function (request, response) {
  let collection = mongodb.collection('users')

  collection.findOne({username: request.get('username')}, function (err, result) {
    if (err) return response.json(err)
    if (!result) return response.json({message: 'Error'})
    if (request.get('password') !== result.password) return response.json({message: 'Error'})

    collection = mongodb.collection('wordbook')

    collection.find({userId: result['_id']}).toArray(function (err, result) {
      if (err) return response.json(err)

      response.json(result)
    })
  })
})
// 新增單字
app.post('/word', function (request, response) {
  let collection = mongodb.collection('users')

  collection.findOne({username: request.get('username')}, function (err, result) {
    if (err) return response.json(err)
    if (!result) return response.json({message: 'Error'})
    if (request.get('password') !== result.password) return response.json({message: 'Error'})
    // 傳入wordbook名字	
    collection = mongodb.collection(request.body.wordbook)

    collection.insert({userId: result['_id'], word: request.body.word, def: request.body.def}, function (err, result) {
      if (err) return response.json(err)

      response.json({message: 'Success'})
    })
  })
})
// 讀取單字
app.get('/word', function (request, response) {
  let collection = mongodb.collection('users')

  collection.findOne({username: request.get('username')}, function (err, result) {
    if (err) return response.json(err)
    if (!result) return response.json({message: 'Error'})
    if (request.get('password') !== result.password) return response.json({message: 'Error'})

    collection = mongodb.collection(request.body.wordbook)

    collection.find({userId: result['_id']}).toArray(function (err, result) {
      if (err) return response.json(err)

      response.json(result)
    })
  })
})
// Create a connect to MongoDB
mongoClient.connect(mongo, function (err, db) {
  if (err) return console.log(err)

  mongodb = db

  // Start Service
  app.listen(appPort, function () {
    console.log('Start Service')
  })
})