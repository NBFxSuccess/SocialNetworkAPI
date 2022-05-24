const { Schema, Types } = require('mongoose');
// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
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
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  
);

module.exports = reactionSchema;
