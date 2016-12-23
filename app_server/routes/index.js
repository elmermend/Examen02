var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

var ctrlEjemplos = require('../controllers/ejemplos');
router.get('/libro/crud/create_mostrar', ctrlEjemplos.libroCrudCreateMostrar);
router.post('/libro/crud/create_registrar', ctrlEjemplos.libroCrudCreateRegistrar);
router.get('/libro/crud/update_mostrar', ctrlEjemplos.libroCrudUpdateMostrar);
router.post('/libro/crud/update_registrar', ctrlEjemplos.libroCrudUpdateRegistrar);
router.get('/libro/crud/delete_mostrar', ctrlEjemplos.libroCrudDeleteMostrar);
router.post('/libro/crud/delete_registrar', ctrlEjemplos.libroCrudDeleteRegistrar);
router.get('/libro/crud/read', ctrlEjemplos.libroCrudRead);
router.get('/location_angular', ctrlEjemplos.locationAngular);
router.get('/grafica', ctrlEjemplos.grafica);

var multer = require('multer');
var unupload = multer({ dest: './uploads/'}).single('archivo');
//var unupload = multer({ dest: './uploads/'}).array('archivo',2);// 2 archivos

router.get('/upload_mostrar', ctrlEjemplos.uploadMostrar);
router.post('/upload_enviar', unupload, ctrlEjemplos.uploadEnviar);

module.exports = router;
