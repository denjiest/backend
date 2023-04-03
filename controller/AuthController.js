import User from "../models/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const Login = async(req,res)=>{
    try{
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(!user) return res.status(401).json({message:"User tidak ditemukkan"})
        const cocok = await argon2.verify(user.password, req.body.password)
        if(!cocok) return res.status(401).json({message:"password tidak cocok"})
        if(user && cocok === true){
            const token = jwt.sign({id:user.id, name:user.name, email:user.email}, process.env.TOKEN_JWT, {expiresIn:"60m"})
            const token_decode = jwt.decode(token)
            const token_stringify = JSON.stringify(token_decode)

            const name = user.name
            const email = user.email
            const status = "login"

            res.status(200).json({message:"Behasil Login", data:{name,email,status,token}})
    }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const me = async(req,res)=>{
    try{
        const token = req.header("auth-token")
        const token_decode = jwt.decode(token)
        const token_email = token_decode.email
        const user = await User.findOne({
            attributes:{exclude:['password']},
            where:{
                email: token_email
            }
        })
        res.status(200).json({message:"Akun yang sedang Login", data:user})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}