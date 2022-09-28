// connection with Node server
require('dotenv').config() // env
const express = require('express'); //Api
const User = require('./Models/userModel') // request user
const app = express(); //middleware
const port = 3000; // Api listen

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Conection DB
const mongoose = require('mongoose');

// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(process.env.URI, {
    useNewUrlParser: true, // deprecated URL
    useUnifiedTopology: true, // Deprecated database
}).then(() =>{
    console.log('Database connected..');
}).catch(err => console.log(err));

// create Get route
app.get('/login', (req, res) => {
    User.find({}, (err,result) => { // method find responde
        if(err){
            res.send(err)
        }
        res.send(result);
    })
});

// Create Post Route
app.post('/register', async (req, res) => {
    let {name,email,password} = req.body

    try{
        let user = new User({
            name,
            email,
            password
        })
        let createdUser = await user.save()
        res.status(201).json({
            status : 'Sucess',
            data : {
                createdUser
            }
        })
    } catch(err){
        console.log(err)
    }
});

app.delete('/user', (req, res) => {
    res.send('DELETE request at /user')
});

