const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const userthoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomAssignments(20);

    const username = getRandomName();
    const email = `${username}@${username}.com`;
    const friends = getRandomName;

    userthoughts.push({
      thoughts,
    });
  }
  users.push({
    username,
    email,
    friends,
  });

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await User.collection.insertMany(userthoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(userthoughts);
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
