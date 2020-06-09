const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A serie must have a title.'],
      trim: true,
      minlength: [3, 'A serie title can not be less than 3 characters.'],
      maxlength: [50, 'A serie title can not be more than 50 characters']
    },
    summary: {
      type: String,
      required: [true, 'A serie must have a summary.'],
      trim: true,
      minlength: [3, 'A serie summary can not be less than 3 characters.'],
      maxlength: [1000, 'A serie summary can not be more than 1000 characters']
    },
    publisher: String,
    genres: String,
    coverImageUrl: String,
    year: Number,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

serieSchema.virtual('issues', {
  ref: 'Issue',
  foreignField: 'serie',
  localField: '_id'
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;
