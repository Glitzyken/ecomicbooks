const express = require('express');
const serieController = require('./../controllers/serieController');

const router = express.Router();

router
  .route('/')
  .get(serieController.getAllSeries)
  .post(serieController.createSerie);

router
  .route('/:id')
  .get(serieController.getSerie)
  .patch(serieController.updateSerie)
  .delete(serieController.deleteSerie);

module.exports = router;
