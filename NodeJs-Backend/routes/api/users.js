const express= require('express');
const passport= require('passport');
const router= express.Router();
const usersApi = require('../../controllers/api/users_api');


router.post('/create-user', usersApi.createUser);
router.post('/create-session', usersApi.createSession);
router.get('/profile',passport.authenticate('jwt', {session:false}), usersApi.profile);



module.exports = router;