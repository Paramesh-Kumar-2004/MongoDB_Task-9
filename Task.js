// Create And Use DB
// CMD : use zen-class



// - Add Data To The Collection

// - Users
db.users.insertMany([
  { user_id: 1, name: "Arun", email: "arun@gmail.com" },
  { user_id: 2, name: "Bala", email: "bala@gmail.com" },
  { user_id: 3, name: "Chitra", email: "chitra@gmail.com" }
])


// - Codekata
db.codekata.insertMany([
  { user_id: 1, problems_solved: 40 },
  { user_id: 2, problems_solved: 70 },
  { user_id: 3, problems_solved: 30 }
])


// - Attance
db.attendance.insertMany([
  { user_id: 1, date: ISODate("2020-10-16"), status: "absent" },
  { user_id: 2, date: ISODate("2020-10-18"), status: "present" },
  { user_id: 3, date: ISODate("2020-10-20"), status: "absent" }
])


// - Topics
db.topics.insertMany([
  { topic_id: 1, topic_name: "HTML", date: ISODate("2020-10-05") },
  { topic_id: 2, topic_name: "CSS", date: ISODate("2020-10-15") },
  { topic_id: 3, topic_name: "JavaScript", date: ISODate("2020-11-01") }
])


// - Tasks
db.tasks.insertMany([
  { task_id: 1, topic_id: 1, user_id: 1, submitted: true, date: ISODate("2020-10-05") },
  { task_id: 2, topic_id: 2, user_id: 2, submitted: false, date: ISODate("2020-10-15") },
  { task_id: 3, topic_id: 2, user_id: 3, submitted: false, date: ISODate("2020-10-16") }
])


// - Company_drives
db.company_drives.insertMany([
  { drive_id: 1, company: "Google", date: ISODate("2020-10-20"), students: [1, 2] },
  { drive_id: 2, company: "Amazon", date: ISODate("2020-10-29"), students: [2, 3] },
  { drive_id: 3, company: "Infosys", date: ISODate("2020-11-05"), students: [1] }
])


// - Mentors
db.mentors.insertMany([
  { mentor_id: 1, name: "Karthik", mentee_count: 18 },
  { mentor_id: 2, name: "Suresh", mentee_count: 10 }
])




// Queries
// 1. Find all the topics and tasks which are taught in October.

// Topics taught in October
db.topics.find({
  date: {
    $gte: ISODate("2020-10-01"),
    $lte: ISODate("2020-10-31")
  }
});

// Tasks taught in October
db.tasks.find({
  date: {
    $gte: ISODate("2020-10-01"),
    $lte: ISODate("2020-10-31")
  }
});
// Output :
/*
Topics:
[
  {
    _id: ObjectId('692146c5d779dc185bc73c01'),
    topic_id: 1,
    topic_name: 'HTML',
    date: ISODate('2020-10-05T00:00:00.000Z')
  },
  {
    _id: ObjectId('692146c5d779dc185bc73c02'),
    topic_id: 2,
    topic_name: 'CSS',
    date: ISODate('2020-10-15T00:00:00.000Z')
  }
]

Tasks:
{ task_id: 1, topic_id: 1, date: "2020-10-05" }
{ task_id: 2, topic_id: 2, date: "2020-10-15" }
{ task_id: 3, topic_id: 2, date: "2020-10-16" }
*/



// 2. Find all company drives conducted between 15-Oct-2020 and 31-Oct-2020.
db.company_drives.find({
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  }
});
// Output :
/*
[
  {
    _id: ObjectId('692146ebd779dc185bc73c04'),
    drive_id: 1,
    company: 'Google',
    date: ISODate('2020-10-20T00:00:00.000Z'),
    students: [ 1, 2 ]
  },
  {
    _id: ObjectId('692146ebd779dc185bc73c05'),
    drive_id: 2,
    company: 'Amazon',
    date: ISODate('2020-10-29T00:00:00.000Z'),
    students: [ 2, 3 ]
  }
]
*/


// 3. Find all company drives and students who appeared for placement.
// Get all company drives
db.company_drives.find({});
// Output :
/* 
[
  {
    _id: ObjectId('692146ebd779dc185bc73c04'),
    drive_id: 1,
    company: 'Google',
    date: ISODate('2020-10-20T00:00:00.000Z'),
    students: [ 1, 2 ]
  },
  {
    _id: ObjectId('692146ebd779dc185bc73c05'),
    drive_id: 2,
    company: 'Amazon',
    date: ISODate('2020-10-29T00:00:00.000Z'),
    students: [ 2, 3 ]
  },
  {
    _id: ObjectId('692146ebd779dc185bc73c06'),
    drive_id: 3,
    company: 'Infosys',
    date: ISODate('2020-11-05T00:00:00.000Z'),
    students: [ 1 ]
  }
]
*/

// For each drive, get the students:
db.users.find({ user_id: { $in: [1, 2] } }); // Google drive
/*
Output :
[
  {
    _id: ObjectId('6921466dd779dc185bc73bf8'),
    user_id: 1,
    name: 'Arun',
    email: 'arun@gmail.com'
  },
  {
    _id: ObjectId('6921466dd779dc185bc73bf9'),
    user_id: 2,
    name: 'Bala',
    email: 'bala@gmail.com'
  }
]
*/
db.users.find({ user_id: { $in: [2, 3] } }); // Amazon drive
/* 
Output : 
[
  {
    _id: ObjectId('6921466dd779dc185bc73bf9'),
    user_id: 2,
    name: 'Bala',
    email: 'bala@gmail.com'
  },
  {
    _id: ObjectId('6921466dd779dc185bc73bfa'),
    user_id: 3,
    name: 'Chitra',
    email: 'chitra@gmail.com'
  }
]
*/



// 4. Find the number of problems solved by the user in CodeKata.
db.codekata.find({});
/*
Output : 
[
  {
    _id: ObjectId('69214676d779dc185bc73bfb'),
    user_id: 1,
    problems_solved: 40
  },
  {
    _id: ObjectId('69214676d779dc185bc73bfc'),
    user_id: 2,
    problems_solved: 70
  },
  {
    _id: ObjectId('69214676d779dc185bc73bfd'),
    user_id: 3,
    problems_solved: 30
  }
]
*/



// 5. Find all the mentors who have mentee count more than 15.
db.mentors.find({
  mentee_count: { $gt: 15 }
});
/*
Output :
[
  {
    _id: ObjectId('692146efd779dc185bc73c07'),
    mentor_id: 1,
    name: 'Karthik',
    mentee_count: 18
  }
]
*/



// 6. Find the number of users who are absent and task not submitted between 15-Oct-2020 and 31-Oct-2020.

// Get Absent Users
db.attendance.find({
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  },
  status: "absent"
});
/*
Output :
[
  {
    _id: ObjectId('69214687d779dc185bc73bfe'),
    user_id: 1,
    date: ISODate('2020-10-16T00:00:00.000Z'),
    status: 'absent'
  },
  {
    _id: ObjectId('69214687d779dc185bc73c00'),
    user_id: 3,
    date: ISODate('2020-10-20T00:00:00.000Z'),
    status: 'absent'
  }
]
*/

// - Get Tasks Not Submitted
db.tasks.find({
  submitted: false,
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  }
});
/* 
Output :
[
  {
    _id: ObjectId('69214be4d779dc185bc73c0a'),
    task_id: 2,
    topic_id: 2,
    user_id: 2,
    submitted: false,
    date: ISODate('2020-10-15T00:00:00.000Z')
  },
  {
    _id: ObjectId('69214be4d779dc185bc73c0b'),
    task_id: 3,
    topic_id: 2,
    user_id: 3,
    submitted: false,
    date: ISODate('2020-10-16T00:00:00.000Z')
  }
]
*/
