const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: String
}, {});

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: { locale: 'en', strength: 2 }
  }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;