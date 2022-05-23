const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      unique:true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    toughts: {
      type: Schema.Types.Array, ref: "thoughtSchema.thoughtId",
    },
  },
  {
    toJSON: {
      getters: true,
    },
    friends: {
      type: Schema.Types.Array, ref: 'users.id',  
    }, 
    
  }
  
);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
const User = model('user', userSchema);

module.exports = User;
