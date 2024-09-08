const Course = require('../models/course');
const User = require('../models/user'); // Import the User model

// @route POST /api/courses
// @desc Create a new course
// @access Private
const createCourse = async (req, res) => {
  const { name, code, credit, lecturer, department, description } = req.body;

  try {
    // Check if course already exists
    const courseExists = await Course.findOne({ code });
    if (courseExists) {
      return res.status(400).json({ message: 'Course already exists' });
    }

    // Create new course
    const course = new Course({
      name,
      code,
      credit,
      lecturer,
      department,
      description
    });

    // Save course in the database
    await course.save();

    // Update the lecturer's course list
    await User.findByIdAndUpdate(lecturer, { $push: { courses: course._id } });

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route GET /api/courses
// @desc Get all courses
// @access Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lecturer', 'name email'); // Populate lecturer details

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route GET /api/courses/:id
// @desc Get a single course by ID
// @access Public
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('lecturer', 'name email'); // Populate lecturer details

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route PUT /api/courses/:id
// @desc Update a course by ID
// @access Private
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, code, credit, lecturer, department, description } = req.body;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update course details
    course.name = name || course.name;
    course.code = code || course.code;
    course.credit = credit || course.credit;
    course.lecturer = lecturer || course.lecturer;
    course.department = department || course.department;
    course.description = description || course.description;

    // Save updated course
    await course.save();

    // Update the lecturer's course list if lecturer has changed
    if (lecturer) {
      await User.findByIdAndUpdate(lecturer, { $addToSet: { courses: course._id } }, { new: true });
      if (course.lecturer) {
        await User.findByIdAndUpdate(course.lecturer, { $pull: { courses: course._id } });
      }
    }

    res.status(200).json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @route DELETE /api/courses/:id
// @desc Delete a course by ID
// @access Private
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Remove the course from the lecturer's course list
    if (course.lecturer) {
      await User.findByIdAndUpdate(course.lecturer, { $pull: { courses: course._id } });
    }

    res.status(200).json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
