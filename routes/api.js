// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://my-release4-mongodb.wip-exam.svc.cluster.local/users';

const ops = {
    user: 'root',
    pass: 'ROOT_PASSWORD',
    auth: {
        authdb: 'admin'
    }
};

// Connect to mongodb
mongoose.connect(dbHost, ops, (err) => {
  if(err) {
    console.log('connection error:',err)
  } else {
    console.log('connected!!!')
  }
});

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// create mongoose model
const User = mongoose.model('User', userSchema);


/* GET api listing. */
router.get('/', (req, res) => {
        res.send('api works and tries to connect to mongo!');
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(err)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(err);

        res.status(200).json(users);i
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });
    console.log('req.body:', req.body)
    user.save(err => {
        if (err){
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;