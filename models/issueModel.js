const mongoose = require('mongoose');
const slugify = require('slugify');

const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An issue must have a name.'],
      trim: true,
      minlength: [3, 'an issue name can not be less than 3 characters.'],
      maxlength: [30, 'an issue name can not be more than 20 characters']
    },
    slug: String,
    file: String,
    serie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Serie',
      required: [true, 'an issue must belong to a serie.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

issueSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
