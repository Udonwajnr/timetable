const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

// @route POST /api/courses
// @desc Create a new course
// @access Private
router.post('/', createCourse);

// @route GET /api/courses
// @desc Get all courses
// @access Public
router.get('/', getCourses);

// @route GET /api/courses/:id
// @desc Get a single course by ID
// @access Public
router.get('/:id', getCourseById);

// @route PUT /api/courses/:id
// @desc Update a course by ID
// @access Private
router.put('/:id', updateCourse);

// @route DELETE /api/courses/:id
// @desc Delete a course by ID
// @access Private
router.delete('/:id', deleteCourse);

module.exports = router;
