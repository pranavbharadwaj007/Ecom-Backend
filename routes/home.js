const express=require('express');
const router=express.Router();

const {home,homev2}=require('../controller/homeController');

router.route('/').get(home);
router.route('/bin').get(homev2);

module.exports=router;