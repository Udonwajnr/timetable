const express = require('express');
const {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
} = require('../controllers/timetableController');

const router = express.Router();

// @route POST /api/timetables
// @desc Create a new timetable entry
// @access Public
router.post('/', createTimetable);

// @route GET /api/timetables
// @desc Get all timetables
// @access Public
router.get('/', getAllTimetables);

// @route GET /api/timetables/:id
// @desc Get a timetable by ID
// @access Public
router.get('/:id', getTimetableById);

// @route PUT /api/timetables/:id
// @desc Update a timetable by ID
// @access Public
router.put('/:id', updateTimetable);

// @route DELETE /api/timetables/:id
// @desc Delete a timetable by ID
// @access Public
router.delete('/:id', deleteTimetable);

module.exports = router;
