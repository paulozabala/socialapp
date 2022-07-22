import express from 'express';
const router = express.Router();
//const path = require('path')
var controller = require('../controller/controller.js');

//middleware files management
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/profilepics/'});


// Rutas
//router.post('/save', controller.save);
//router.get('/articles/:last?', controller.getArticles);
//router.get('/article/:id', controller.getArticle);
//router.delete('/article/:id', controller.delete);


//test route
router.get('/test',controller.test);

//Image routes
router.post('/saveImage/:id?', md_upload, controller.savePImg);
router.post('/uploadImage/:id?', md_upload, controller.saveImg);
router.get('/getImage/:image', controller.getImage);


//Login-reg / user routes
router.get('/searchProfile/:prof', controller.getUser);
router.post('/saveUser', controller.saveUser);
router.put('/modUser/:id', controller.updateUser);

//Routing for -> msg
router.get('/getMsg', controller.getMsgs);
router.get('/getMsgByOwner/:id', controller.getMsgByOwner);
router.post('/saveMsg', controller.saveMsg);
router.put('/updateMsg/:id', controller.updateMsg);

//Comment routes
router.get('/getComments/:id', controller.getComments);
router.post('/saveComment', controller.saveComment);





module.exports = router;
