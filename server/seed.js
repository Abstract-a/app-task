import 'dotenv/config';
import { db } from './libs/dbConnect.js';

const users = [
  {
    username: 'sami12',
    email: 'sami@mail.com',
    password: '$2y$10$de..TeYCvYSwfYCytqOFpeS3di8yKhsbjjJFfgDC7MVLclpRNsH82',
    avatar: 'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    username: 'jane15',
    email: 'jane@mail.com',
    password: '$2y$10$de..TeYCvYSwfYCytqOFpeS3di8yKhsbjjJFfgDC7MVLclpRNsH82',
    avatar: 'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const tasks = [
  {
    name: 'Read Atomic Habits',
    description: 'Finish reading Atomic Habits by James Clear',
    priority: 'not urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Learn DSA',
    description: 'read a DSA book and do some leetcodes',
    priority: 'urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

try {
  // we create two collections in our db. one for the users and one for the tasks.
  // Seeding Users

  let collection = await db.collection('users');
  console.log('[seed]', 'Seeding Users...');

  const result = await collection.insertMany(users);
  console.log(result.insertedIds);
  console.log('[seed]', 'Seeding Users done...');

  // Seeding Tasks
  // establishing relation between the tasks and the users.
  tasks[0].owner = result.insertedIds[0];
  tasks[1].owner = result.insertedIds[1];

  collection = await db.collection('tasks');
  console.log('[seed]', 'Seeding Tasks ... ');

  await collection.insertMany(tasks);
  console.log('[seed]', 'Seeding tasks done');

  console.log('[seed]', 'All Done');
} catch (error) {
  console.log('[seed]', ' Error: ', error);
}

process.exit();
