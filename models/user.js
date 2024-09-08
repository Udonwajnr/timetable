const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['student', 'lecturer'],
      default: 'lecturer'
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    }
  }, {
    timestamps: true
  });
  
  // Pre-save hook to hash password before saving to database
  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  
  // Method to compare entered password with hashed password
  UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Index email for faster queries
  UserSchema.index({ email: 1 });
  
  module.exports = mongoose.model('User', UserSchema);