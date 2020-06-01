const Serie = require('./../models/serieModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllSeries = catchAsync(async (req, res) => {
  const series = await Serie.find();

  res.status(200).json({
    status: 'success',
    result: series.length,
    data: {
      series
    }
  });
});

exports.getSerie = catchAsync(async (req, res) => {
  const serie = await Serie.findById(req.params.id); // .populate('recipes');

  res.status(200).json({
    status: 'success',
    data: {
      serie
    }
  });
});

exports.createSerie = catchAsync(async (req, res) => {
  const newSerie = await Serie.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      serie: newSerie
    }
  });
});

exports.updateSerie = catchAsync(async (req, res) => {
  const serie = await Serie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      serie
    }
  });
});

exports.deleteSerie = catchAsync(async (req, res, next) => {
  const serie = await Serie.findByIdAndDelete(req.params.id);

  if (!serie) {
    return next(new AppError('No serie found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
