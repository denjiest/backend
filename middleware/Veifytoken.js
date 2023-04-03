import jwt from "jsonwebtoken"

export const verify_token = (req,res,next)=>{
    try{
        const auth_token = req.header("auth-token")

        const verifikasi = jwt.verify(auth_token, process.env.TOKEN_JWT)
        if(!verifikasi) return res.status(400).json({message:"akses ditolak, tidak dapat mengakses service"})
        
        req.user = verifikasi
        next()
    }catch(error){
        res.status(400).json({message:error.message})
    }
}