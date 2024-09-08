const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Import the User model

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role
    });

    // Save the user in the database
    await user.save();

    // Send a success response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password matches
      const isMatch = await user.matchPassword(password);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Respond with user details (excluding the password)
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const profile = async (req, res) => {
      const { id } = req.body;
    try {
      // Find the user by their ID (assumed to be in req.user._id)
      const user = await User.findById(id).select('-password'); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with user details
      res.status(200).json({
        message: 'Profile retrieved successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

module.exports ={register,login,profile}