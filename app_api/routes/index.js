var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlLibros = require('../controllers/libros');

router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

//libros

router.get('/libros', ctrlLibros.librosReadAll);
router.get('/libros/:libroid', ctrlLibros.librosReadOne);
router.post('/libros/create', ctrlLibros.librosCreate);
router.put('/libros/update', ctrlLibros.librosUpdate);
router.delete('/libros/delete', ctrlLibros.librosDelete);

module.exports = router;
