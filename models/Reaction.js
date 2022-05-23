const { Schema, Types } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    reactionId: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    reactionBody: {
      type: String,
      default: true,
    },
    username: {
      type: String,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      get: (date) => timeSince(date),
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
const Reaction = model('reaction', ReactionSchema);

module.exports = Reaction;
