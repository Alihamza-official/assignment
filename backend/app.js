var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const Task = require('./models/task.model');

const verify = require('./middlewares/verifyUserToken.middleware');

var app = express();
require('dotenv').config();

const uri = process.env.ATLAS_URI;

console.log(process.env.ATLAS_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


app.get('/', (req, res) => {
  res.status(200).json('Ok')
})


app.post('/register', async (req, res) => {
  try {
    // const name = req.body.name;
    const email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findOne({ email });

    if (user) 
    {
        return res.status(200).send({ status:false, message:'User already exists' });
    }

    const newUser = new User({
        email,
        password: hashPassword
    });

    const savedUser = await newUser.save();

     //create and assign token
    const token = jwt.sign(
      {
          id: savedUser._id,
          email: savedUser.email,
      
      },
      process.env.USER_TOKEN_SECRET
    );

    console.log({
        message: 'User Registered Succesfully',
        user: {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        },
        token,
        status: true
    })

    return res.status(200).json({
        user: {
            id: savedUser._id,
            email: savedUser.email,
        }
    });

  } 
  catch (err) {
      console.log(err);
      res.status(200).json({message: "Error comes"});
  }

})

app.post('/login', async (req, res) => {
   //check if username exists
   const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) 
  {
      return res.status(200).send({found:false, message:'email incorrect'});
  }

  //check password is correct or not
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) 
  {
      return res.status(200).send({found: false, message: 'Password Incorrect'});
  }    

  //create and assign token
  const token = jwt.sign(
      {
          id: user._id,
          name: user.name,
          email: user.email,
      },
      process.env.USER_TOKEN_SECRET
  );

  res.header('auth', token).send({
      jwt: token
  });
})

app.get('/test', verify, async (req, res) => {
  try {
     
    res.status(200).json("tested");
  } catch(err) {

  }
})

app.get('/user', verify, async(req, res) => {
    try {
      const { id, email } = req.body;
      
      res.status(200).json({
        user: {
          id, 
          email
        }
      });
    }
    catch(err) {
      console.log(err);
    }
})

app.post('/create-task', verify, async (req, res) => {
  try {
    const { id, name } = req.body;
    // console.log(req.body);

    const task = new Task({
      userid: id,
      name
    })

    await task.save();
    console.log(task);
    res.status(200).json({
      id: task._id,
      name
    });

  } catch(err) {
    console.log(err);
  }
})

app.get('/list-tasks', verify, async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const tasks = await Task.find({ userid: id });

    console.log(tasks);
    res.status(200).json({
      tasks
    })

  } catch(err) {

  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
