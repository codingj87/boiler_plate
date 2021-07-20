// import { express } from 'express';
import express, { urlencoded, json } from 'express'
import mongoose from 'mongoose';
import User from './models/User.js'
import cookieParser from 'cookie-parser'

// const mongoURI = require('./config/key.cjs');
import { mongoURI } from './config/key.js';
const app = express()
const port = 500

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

app.post('/login', (req, res) => {

  // 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return json({ loginSuccess: false, message: '비밀번호가 틀렸습니다'})
      }

      // 비밀번호까지 맞았다면 토큰 생성 
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰 저장, 쿠키? 세션? 로컬스토리지?
        res.cookie("x-auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id})
      })
      
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


