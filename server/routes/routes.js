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



//Rutas para  -> mensajes
//router.post('/save2', ArticleController.save2);
//router.post('/save1', ArticleController.save1);
//router.get('/historial/:id', ArticleController.getHistorial);

//Rutas -> login
router.post('/saveUser', controller.saveUser);
router.get('/searchprofile/:prof', controller.getClient);
//router.get('/searchprofile/:user', ArticleController.getUser);


module.exports = router;
