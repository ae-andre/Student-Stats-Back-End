const mongoose = require('mongoose');
const connection = require('../config/connection.js');
const { Course, Student } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');
const dotenv = require('dotenv');
dotenv.config()
const connectionString = process.env.MONGODB_URI;

// Establish a connection to the MongoDB database
mongoose.connect(connectionString);;

// Get the default connection
const db = mongoose.connection;

// Bind event handlers to the Mongoose connection
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  // Delete the collections if they exist
  await db.collection('courses').drop();
  await db.collection('students').drop();

  // Create empty array to hold the students
  const students = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  
  await db.close()
});
