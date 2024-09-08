const mongoose = require('mongoose');

// Define the schema for time slots in the timetable
const TimeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String, // e.g., "09:00 AM"
    required: true,
  },
  endTime: {
    type: String, // e.g., "10:00 AM"
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Define the schema for the timetable
const TimetableSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true,
  },
  timeSlots: [TimeSlotSchema],
});

// Optionally, you can index the day field for faster querying
// TimetableSchema.index({ day: 1 });

module.exports = mongoose.model('Timetable', TimetableSchema);
