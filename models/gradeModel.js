export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Date,
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const Grade = mongoose.model("grade", schema, "grade");

  return Grade;
};
