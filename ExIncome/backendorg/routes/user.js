const router=require('express').Router();
const {userSignup,userSignin}=require('../controllers/user');
//users

router.post('/signup',userSignup);
router.post('/signin',userSignin);
// router.userSignout('/signout',);

module.exports = router;