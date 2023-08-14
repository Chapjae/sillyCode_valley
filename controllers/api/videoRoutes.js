const router = require("express").Router();
const cloudinary = require("cloudinary").v2; // Setting up Cloudinery
const { v4: uuidv4 } = require("uuid");
const { Video, User, Comment } = require('../../models');
const { findAll } = require("../../models/User");

module.exports = router;
