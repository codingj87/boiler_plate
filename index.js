// import { express } from 'express';
import express, { urlencoded, json } from 'express'
import mongoose from 'mongoose';
const app = express()
const port = 5000
import User from './models/User.js'

// const mongoURI = require('./config/key.cjs');
import { mongoURI } from './config/key.js';

app.use(urlencoded({extended: true}));

app.use(json());

const { connect } = mongoose;
connect(mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log("success MONGO"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! hi')
})


app.post('/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


