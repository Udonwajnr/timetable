const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure every course has a name
    trim: true, // Remove extra spaces
  },
  code: {
    type: String,
    required: true,
    unique: true, // Ensure course codes are unique
    uppercase: true, // Store course codes in uppercase (e.g., CS101)
  },
  credit: {
    type: Number,
    required: true,
    min: 1, // Ensure credit is at least 1
    max: 3, // Assuming 3 is the maximum credit load for this system
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Ensure every course has a lecturer assigned
  },
  department: {
    type: String, // Include department or faculty field
    required: true,
    trim: true,
    default:"computer Science"
  },
  description: {
    type: String, // Add a description field for additional course information
    trim: true,
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields
});


module.exports = mongoose.model('Course', CourseSchema);
