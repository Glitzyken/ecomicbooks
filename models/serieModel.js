const mongoose = require('mongoose');
const slugify = require('slugify');

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A serie must have a title.'],
      trim: true,
      minlength: [3, 'A serie title can not be less than 3 characters.'],
      maxlength: [30, 'A serie title can not be more than 20 characters']
    },
    slug: String,
    summary: {
      type: String,
      required: [true, 'A serie must have a summary.'],
      trim: true,
      minlength: [3, 'A serie summary can not be less than 3 characters.'],
      maxlength: [30, 'A serie summary can not be more than 100 characters']
    },
    publisher: String,
    genres: [String],
    issues: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Issue',
        required: [true, 'A serie must have at least one issue.']
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

serieSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;
