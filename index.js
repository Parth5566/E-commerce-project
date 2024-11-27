const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const path = require('path'); 


connectToMongo();
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.json())



// In index.js or app.js
app.use('/api/userform', require('./routes/userform'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{
  maxAge: '1d', // Cache images for 1 day
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'public, max-age=86400'); // 1 day in seconds
  }
}));
app.use('/api/userprofile', require('./routes/userprofile'));
app.use('/api/createPost', require('./routes/createPost'));
app.use('/api/product', require('./routes/product'));




app.listen(port, () => {
  console.log(`listening at http://127.0.0.1:${port}`)
})