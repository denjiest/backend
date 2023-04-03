import express from 'express'
import {
    getAllAkun,
    getAllAkunById,
    createAkun,
    updateAkun,
    deleteAkun,
    updateAkunSendiri,
    createAkunGmail
} from '../controller/UserController.js'
import { verify_token } from '../middleware/Veifytoken.js';

const router = express.Router();

router.get('/user',verify_token, getAllAkun),
router.get('/user/:id', getAllAkunById),
router.post('/user/sign-up', createAkun),
router.put('/user/:id', updateAkun),
router.delete('/user/:id', deleteAkun)

router.put('/user_update', verify_token, updateAkunSendiri)
router.post('/user/gmail', createAkunGmail)

export default router
