import User from '../models/UserModel.js'
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

export const getAllAkun = async(req,res)=>{
    try{
        const cari = await User.findAll({
        })
        res.status(200).json({mesage:"Berhasil Mencari semua data akun", data: cari})
    }catch(error){
        res.status(400).json({message:error.mesage})
    }
}

export const getAllAkunById = async(req,res)=>{
    try{
        const caribyid = await User.findOne({
            where:{
                id : req.params.id
            }
        })
        res.status(200).json({message:"Berhasil mencari data akun by id", data:caribyid})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const createAkun = async(req,res)=>{
    try{
        const {confPassword} = req.body
        if(confPassword == null) return res.status(400).json({message:"confirm password harus diisi"})
        if(req.body.password !== confPassword) return res.status(400).json({message:"password dan confirm password tidak sama"})
        const hashpassword = await argon2.hash(req.body.password)
        const buat = await User.create({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:hashpassword
        })
        
        const cari = await User.findOne({
            where:{
                name:req.body.name
            }
        })

        //Mengirim pesan jika sudah berhasil mendaftar
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: process.env.EMAIL,
        //       pass: process.env.PASS,
        //     }
        //   });
      
        //   const mailOptions = {
        //     from: process.env.EMAIL,
        //     to: req.body.email,
        //     subject:"Register Berhasil",
        //     text:"Register Berhasil akun yang bernama "+req.body.name+""
        //   };
      
        //   transporter.sendMail(mailOptions);

        res.status(200).json({message:"Berhasil Membuat Akun", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const updateAkun = async(req,res)=>{
    try{
        const update = await User.update({
            nama : req.body.nama,
            email: req.body.email
        },{
            where:{
                id:req.params.id
            }
        })

        const cari = await User.findOne({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({message:"Berhasil Update Akun", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const deleteAkun = async(req,res)=>{
    try{
        const hapus = await User.destroy({
            where:{
                id:req.params.id
            }
        })

        const cari = await User.findOne({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({message:"Berhasil menghapus Akun", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

//fungsi untuk mengganti akun user sendiri
export const updateAkunSendiri = async(req,res)=>{
    try{
        const token = req.header("auth-token")
        const token_decode = jwt.decode(token)
        const token_email = token_decode.email

        if(!req.file){
            const update = await User.update({
                name:req.body.name,
                username:req.body.username
            },{
                where:{
                    email:token_email
                }
            })
            const cari = await User.findOne({
               attributes:{exclude:['password']},
               where:{
                email:token_email
               }
            })
            res.status(200).json({message:"Berhasil Update Akun", data:cari})
        }else{
        const update = await User.update({
            name:req.body.name,
            username:req.body.username,
            // email:req.body.email,
            image: req.file.path.replace("\\","/")
        },{
            where:{
                email:token_email
            }
        })

        const user = await User.findOne({
            attributes:{exclude:['password']},
            where:{
                email: token_email
            }
        })
        res.status(200).json({message:"Berhasil Update Akun", data:user})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const createAkunGmail = async(req,res)=>{
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
}