const Issue = require('./../models/issueModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllIssues = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.serieId) filter = { serie: req.params.serieId };

  const issues = await Issue.find(filter);

  res.status(200).json({
    status: 'success',
    result: issues.length,
    data: {
      issues
    }
  });
});

exports.getIssue = catchAsync(async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      issue
    }
  });
});

exports.createIssue = catchAsync(async (req, res) => {
  if (!req.body.serie) req.body.serie = req.params.serieId;

  const newIssue = await Issue.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      issue: newIssue
    }
  });
});

exports.updateIssue = catchAsync(async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      issue
    }
  });
});

exports.deleteIssue = catchAsync(async (req, res, next) => {
  const issue = await Issue.findByIdAndDelete(req.params.id);

  if (!issue) {
    return next(new AppError('No issue found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
