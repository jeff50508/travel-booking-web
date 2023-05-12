__使用套件如下__
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

