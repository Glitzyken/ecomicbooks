const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An issue must have a name.'],
      unique: true,
      trim: true,
      minlength: [3, 'An issue name can not be less than 3 characters.'],
      maxlength: [55, 'An issue name can not be more than 55 characters']
    },
    coverImageUrl: {
      type: String,
      required: [true, 'An issue must have a cover image.']
    },
    imageUrls: [String],
    serie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Serie',
      required: [true, 'An issue must belong to a serie.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

issueSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'serie',
    select: 'title coverImageUrl'
  });

  next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
