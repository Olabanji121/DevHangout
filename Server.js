const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

// Connect Database
connectDB();



// init middleware bodyParser
app.use(express.json({extended: false}))

// define route

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

// serve static assets in production
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/*', (req,res)=> {res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'))})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`)
);