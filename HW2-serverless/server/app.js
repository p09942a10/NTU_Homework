// 引入 express module
const express = require('express')

// 產生一個 express instance - app
const app = express()

const succ_req = {
  success: true
}

const bad_req = {
  success: false
}

// Express 的重點所在! 稍後解釋
app.get('/', function(req, res) {
  res.send('Hello World')
})

app.post('/login', function(req, res) {
  const userList = {
    kevin: '0000'
  }
  const acc = req.params.acc
  const pwd = req.params.pwd
  if (userList[acc] === pwd) {
    res.send(succ_req)
  } else {
    res.send(bad_req)
  }
})

app.post('/getMessage', function(req, res) {
  const message = {
    title: 'Homework 2',
    content: 'Homework 2 by vue'
  }
  res.send(message)
})

// 讓 express server 跑在 port 3000
app.listen(3000, function() {
  console.log('Listen on port 3000')
})
