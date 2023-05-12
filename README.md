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
  
  
  # 登入系統 
  __使用axios、cors、express進行前後端資訊傳遞__
![login](https://github.com/jeff50508/travel-booking-web/assets/111333990/0adb1bc7-964e-4654-81e2-bea0e782a651)

