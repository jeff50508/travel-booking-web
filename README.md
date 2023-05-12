# MERN project  

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
  
  
  __使用tailwind切版，axios、cors、express前、後端資訊傳遞，並對使用者的資料使用bcrypt加密、jwt簽名、cookie-parser解析使用者cookies，且加入環境變數上傳mongodb__  
  # 登入、註冊系統 
  ![login](https://github.com/jeff50508/travel-booking-web/assets/111333990/0adb1bc7-964e-4654-81e2-bea0e782a651)
  ![register](https://github.com/jeff50508/travel-booking-web/assets/111333990/21672dea-5c77-4293-ad69-518f87353be0)
  
  
  # 登入後將會顯示所有用戶上傳的訂房資訊、點擊圖片即可進入預訂畫面，並且填入欲住宿的時間、天數進行預定
  ![螢幕擷取畫面 2023-05-06 190239](https://github.com/jeff50508/travel-booking-web/assets/111333990/8a73e1fe-23c3-438a-94d3-d4e2bdac8273)  
  
  ![ALLUCANSEE](https://github.com/jeff50508/travel-booking-web/assets/111333990/98e600f0-f02a-408e-a096-f05bb3b4c503)
  ![螢幕擷取畫面 2023-05-06 190420](https://github.com/jeff50508/travel-booking-web/assets/111333990/8d548d1d-5efe-4318-ae93-01f765b62b2e)

  
  # 可選擇登出、查看目前已預訂的住宿、新增住宿
  ![logout](https://github.com/jeff50508/travel-booking-web/assets/111333990/e718346d-d61a-44e9-92d5-30dcd0d5541a)
  ![mybook](https://github.com/jeff50508/travel-booking-web/assets/111333990/2cb91db5-332a-4fa7-8570-986a4aea3118)
  ![new accmodation](https://github.com/jeff50508/travel-booking-web/assets/111333990/38bbd620-0ae1-4a5b-afd8-53ed70b06f71)
  
  

  
  
