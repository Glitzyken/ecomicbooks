const mongoose = require('mongoose');
const slugify = require('slugify');

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A serie must have a title.'],
      unique: true,
      trim: true,
      minlength: [3, 'A serie title can not be less than 3 characters.'],
      maxlength: [50, 'A serie title can not be more than 50 characters.']
    },
    slug: String,
    summary: {
      type: String,
      required: [true, 'A serie must have a summary.'],
      trim: true,
      minlength: [3, 'A serie summary can not be less than 3 characters.'],
      maxlength: [1000, 'A serie summary can not be more than 1000 characters.']
    },
    publisher: String,
    genres: [String],
    coverImageUrl: {
      type: String,
      required: [true, 'A serie must have a cover image.']
    },
    year: Number,
    popular: {
      type: Boolean,
      default: 'false'
    },
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

serieSchema.index({ slug: 1 });
serieSchema.index({ publisher: 1 });
serieSchema.index({ genres: 1 });

serieSchema.virtual('issues', {
  ref: 'Issue',
  foreignField: 'serie',
  localField: '_id'
});

serieSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;
