const Timetable = require('../models/timetable');
const Course = require('../models/course');
const User = require('../models/user');

// Helper function to validate day
const isValidDay = (day) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day);

// @route POST /api/timetables
// @desc Create a new timetable entry
// @access Public
const createTimetable = async (req, res) => {
  const { day, timeSlots } = req.body;

  try {
    // Validate day
    if (!isValidDay(day)) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    // Check if all courses and lecturers exist
    for (let slot of timeSlots) {
      const courseExists = await Course.findById(slot.course);
      const lecturerExists = await User.findById(slot.lecturer);
      if (!courseExists || !lecturerExists) {
        return res.status(400).json({ message: 'Course or lecturer not found' });
      }
    }

    // Create and save new timetable
    const timetable = new Timetable({ day, timeSlots });
    await timetable.save();

    res.status(201).json({
      message: 'Timetable created successfully',
      timetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route GET /api/timetables
// @desc Get all timetables
// @access Public
const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate("user");
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route GET /api/timetables/:id
// @desc Get a timetable by ID
// @access Public
const getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route PUT /api/timetables/:id
// @desc Update a timetable by ID
// @access Public
const updateTimetable = async (req, res) => {
  const { day, timeSlots } = req.body;

  try {
    // Validate day
    if (day && !isValidDay(day)) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    // Check if all courses and lecturers exist
    for (let slot of timeSlots) {
      const courseExists = await Course.findById(slot.course);
      const lecturerExists = await User.findById(slot.lecturer);
      if (!courseExists || !lecturerExists) {
        return res.status(400).json({ message: 'Course or lecturer not found' });
      }
    }

    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      { day, timeSlots },
      { new: true, runValidators: true }
    );

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({
      message: 'Timetable updated successfully',
      timetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route DELETE /api/timetables/:id
// @desc Delete a timetable by ID
// @access Public
const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }
    res.status(200).json({
      message: 'Timetable deleted successfully',
      timetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
};
