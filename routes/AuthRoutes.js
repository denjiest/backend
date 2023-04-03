import express from "express"
import{Login,
me} from "../controller/AuthController.js"

import { verify_token } from "../middleware/Veifytoken.js"

const router = express.Router()

router.post("/login", Login),
router.get("/me",verify_token, me)

export default router