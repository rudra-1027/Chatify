
import { Router } from 'express';
import controller from '../controllers/controller.js'
import jwt from 'jsonwebtoken'
import { upload } from '../multer.js';
const router = Router(); 

const auth=(req,res,next)=>{
    const isToken=req.cookies.token;
    if(!isToken){
        return res.send(`<script>alert("Your session expired ,please re-login!"); window.location.href="/login"</script>`)
    }

    try {
        const valid=jwt.verify(isToken,process.env.JWT_KEY)
        req.user=valid
        next()
    } catch{
        return res.send(`<script>alert("Your session expired ,please re-login!"); window.location.href="/login"</script>`)
    }


}
// Get all auths
router.post('/auth/signup',controller.signup )
router.post('/auth/login',controller.login)
router.post('/auth/setProfile',auth,upload.single("imgurl"),controller.setProfile)
router.get('/auth/search',auth,controller.search)
router.post('/auth/addFrd',auth,controller.addFrd)
router.post('/auth/getStatus',auth,controller.getStatus)
router.post('/auth/getChatList',auth,controller.getChatList)
router.post('/auth/OpenChat',auth,controller.OpenChat)
router.post('/auth/getMessage',auth,controller.getMessage)
router.post('/auth/getFrdList',auth,controller.getFrdList)
router.post('/auth/acceptFrd',auth,controller.acceptFrd)
router.post('/auth/rejectFrd',auth,controller.reject)


router.get('/logout',auth,controller.logout)







export default router;