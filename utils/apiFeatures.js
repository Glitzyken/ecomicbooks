class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.queryString };
    const excludedField = ['sort', 'page', 'limit', 'fields'];
    excludedField.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // Field Limiting (Projecting)
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }

  // Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1; // set default page
    const limit = this.queryString.limit * 1 || 100; // set default limit (how many recipes to show per page)
    const skip = (page - 1) * limit; // Formular: if page=3&limit=100, therefore, 1-100 = page 1, 100-200 = page 2, 200-300 = page 3. Thus, formular for calculating how many recipes to be skipped to get to the requested page number = requested page - 1 * limit

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
