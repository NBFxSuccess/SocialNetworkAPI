const { Schema, model } = require('mongoose');


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
    thoughts: {
      type: Schema.Types.Array, ref: "Thoughts",
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals:true,
    },
    id:false,
    friends: {
      type: Schema.Types.Array, ref: 'Users',  
    }, 
    
  }
  
);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
const User = model('user', userSchema);

module.exports = User;
