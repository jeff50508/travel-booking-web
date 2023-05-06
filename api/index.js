const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Axios } = require('axios');
const imageDownloader = require('image-downloader');
require('dotenv').config();
const app = express();
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/place');
const Booking = require('./models/booking');

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret = 'fdsgtrjhtwrsedg';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000",
}))

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err,userData) => {
            if (err) throw err;
            resolve(userData);
        })
    })
}

app.get('/test',(req,res) => {
    res.json('testok');
});


app.post('/register',async (req,res) => {
    const {name,email,password} = req.body;
    // res.json({email,password});
    try {
        const UserDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
    res.json(UserDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
        });
        } else {
        res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});


app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async(err,userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    } else {
    res.json(null)
    }
})

app.post('/logout',(req,res) => {
    res.cookie('token','').json(true);
    }
)


app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
        
    })
    console.log(newName)
    res.json(newName)
})

const photoMiddleware = multer ({dest:'uploads/'});
app.post('/upload', photoMiddleware.array('photos',100), (req, res) => {
    // res.json(req.files);
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadFiles);
});

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
        title,address,addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGusets,price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async(err,userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,address,photos:addedPhotos,description,
            perks,extraInfo,checkIn,checkOut,maxGusets,price
        })
        res.json(placeDoc)
    })
});

app.get('/user-places', (req, res) =>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err,userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}))
    })
})  

app.get('/places/:id', async (req, res) => {
    const{id} = req.params;
    res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
    const {token} = req.cookies;
    const {
        id,title,address,addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGusets,price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async(err,userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                owner: userData.id,
                title,address,photos:addedPhotos,description,
                perks,extraInfo,checkIn,checkOut,maxGusets,price
            })  
            await placeDoc.save();
            res.json('ok')
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user:userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    })
})


app.get('/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    console.log(userData.id)
    res.json(await Booking.find({user:userData.id}).populate('place'))
})

app.listen(4000);