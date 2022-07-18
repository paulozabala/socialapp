import express from 'express';
const router = express.Router();

var controller = require('../controller/controller.js');

//middleware files management
//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './upload/articles'});


// Rutas
//router.post('/save', controller.save);
//router.get('/articles/:last?', controller.getArticles);
//router.get('/article/:id', controller.getArticle);
//router.put('/article/:id', controller.update);
//router.delete('/article/:id', controller.delete);
//router.post('/upload-image/:id?', md_upload, controller.upload);
//router.get('/get-image/:image', controller.getImage);
//router.get('/search/:search', controller.search);

router.get('/test',controller.test);

//Login-reg / user routes
router.get('/searchprofile/:prof', controller.getUser);
router.post('/saveUser', controller.saveUser);
router.put('/modUser/:id', controller.updateUser);
//router.get('/searchprofile/:user', ArticleController.getUser);

//Routing for -> msg
router.get('/getMsg', controller.getMsgs);
router.get('/getMsgByOwner/:id', controller.getMsgByOwner);
router.post('/saveMsg', controller.saveMsg);

//Comment routes
router.get('/getComments/:id', controller.getComments);
router.post('/saveComment', controller.saveComment);





module.exports = router;
