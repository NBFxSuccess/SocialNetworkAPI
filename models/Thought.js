const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      default: true,
    },
    reactions: [reactionSchema],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Course = model('course', courseSchema);

module.exports = Course;
