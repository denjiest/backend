import express from "express"
import cors from "cors"
import multer from "multer"
import nodemailer from "nodemailer"
import UserRoute from "./routes/UserRoutes.js"
import Login from "./routes/AuthRoutes.js"
import dotenv from "dotenv"

import User from "./models/UserModel.js"

import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(filename);

const fileStorage = multer.diskStorage({
    destination :(req,fie,cb) => {
        cb(null, 'images');
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+ '-' + file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/png'
     || file.mimetype === 'image/jpg' 
     || file.mimetype === 'image/jpeg'){
        cb(null, true)
     }else{
        cb(null, false)
     }
}

const app = express();
app.post('/send-email', async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'foultokyo944@gmail.com',
          pass: process.env.PASS,
        }
      });
  
      const mailOptions = {
        from: 'foultokyo944@gmail.com',
        to:"jimenk123@gmail.com",
        subject:"test",
        text:"test1234"
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single('image'))


// const upload = multer({ dest: 'images/' });

// app.post('/upload', upload.single('image'), function(req, res) {
//     console.log(req.file.path);
//     res.send('File berhasil diunggah');
//   });

app.use(cors())
app.use(express.json())
app.use(UserRoute,
    Login)

app.listen(8000, ()=> console.log('Server up and running...'));