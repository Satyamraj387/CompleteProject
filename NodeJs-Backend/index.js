const express =  require ('express');
const cookieParser= require('cookie-parser');
const cors=require('cors');

const app =express();
const port =8000;
const db= require('./config/mongoose');
const session= require('express-session');
const passport = require('passport');
const passportJWT = require ('./config/passport-jwt-strategy');

const MongoStore =require('connect-mongo');
app.use(
    cors({
        origin:"http://localhost:3000"
    })
)
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(session({
    name: 'assignment',
    //change the secret before deployment 
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
          mongoUrl: 'mongodb://localhost/assignmentDatabase',
          autoRemove: "disabled",
        },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}) );
app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

app.use('/',   require('./routes/index.js'));

app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err} `);
    }
    console.log(`sever is running on port: ${port}`);
});