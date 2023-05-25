const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();

const blogs = [
  {
    id: 'blog1',
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming language.',
    author: 'Michael Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z',
  },
  {
    id: 'blog2',
    title: 'Mastering React Framework',
    description: 'Become proficient in building web applications using React.',
    author: 'Jane Smith',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z',
  },
  {
    id: 'blog3',
    title: 'Deep Dive into Node.js',
    description:
      'Explore the advanced concepts of Node.js and server-side development.',
    author: 'Michael Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z',
  },
  {
    id: 'blog4',
    title: 'CSS Tricks for Web Designers',
    description: 'Discover useful CSS techniques to enhance your web designs.',
    author: 'Emily Davis',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z',
  },
  {
    id: 'blog5',
    title: 'Effective Database Management',
    description:
      'Learn best practices for managing databases and optimizing performance.',
    author: 'Robert Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z',
  },
];

router.get('/', (req, res) => {
  res.json({ message: 'hello from blog route' });
});

router.get('/all-blogs', (req, res) => {
  res.json({ success: true, data: blogs });
});

router.delete('/delete-blogs/:id', (req, res) => {
  const delId = req.params.id;
  const findIndex = blogs.findIndex((label) => label.id.toString() === delId);
  if (findIndex === -1) {
    return res.status(400).json({ success: false });
  } else {
    blogs.splice(findIndex, 1);
    res.status(200).json({ success: true, data: 'id deleted' });
  }
});
//filter returns an array[]
//length = array[], String
//.find returns the exact item if not found returns undefined

router.get('/one-blog/:id', (req, res) => {
  const reqId = req.params.id;
  const findBlog = blogs.find((label) => label.id.toString() === reqId);

  console.log(findBlog);

  if (findBlog === undefined) {
    return res.status(400).json({ success: false, message: 'ID not found' });
  } else {
    res.status(200).json({ success: true, data: findBlog });
  }
});

router.get('/more-blogs/:author', (req, res) => {
  const reqAuth = req.params.author.toLocaleLowerCase();
  const findAuth = blogs.filter(
    (name) => name.author.toLocaleLowerCase() === reqAuth
  );
  if (findAuth.length === 0) {
    console.log(findAuth);
    return res
      .status(400)
      .json({ success: false, message: 'Author not found' });
  } else {
    res.status(200).json({ success: true, data: findAuth });
  }
});

router.post('/add-blog', (req, res) => {
  let errArray = [];
  let newID = `blog${blogs.length + 1}`;
  const newBlog = {
    id: uuid(), // You want to automate the ID, because the client does not know if the ID is being used
    // You can download a dev dependiece like uuid
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    createdAt: new Date().toISOString(), // class called date, creates a date and a time then it calls the method .toISOString() which converts this time to ISOString
    lastModified: new Date().toISOString(),
  };

  for (let key in newBlog) {
    if (newBlog[key] === '' || newBlog[key] === undefined) {
      errArray.push(`${key} cannot be empty`);
    }
  }
  if (errArray.length > 0) {
    return res.status(500).json({ error: true, message: errorArray });
  } else {
    blogs.push(newBlog);
    res.status(200).json({ message: 'Success' });
  }
});

//update (put) one by id route

router.put('/update-blog/:updateId', (req, res) => {
  const { title, description, author } = req.body;
  const findIndex = blogs.findIndex(
    (label) => label.id === req.params.updateId
  );
  const updateblog = blogs[findIndex];

  const spreadBlog = {...updateblog}; //Spread operator is either {...} or [...]

  if (title === undefined) {
    res.status(400).json({ success: false, message: ` ${blogs.title} cannot be empty ` });
  } else if (description === undefined) {
    res.status(400).json({ success: false, message: ` ${blogs.title} cannot be empty ` });
  } else if (author === undefined) {
    res.status(400).json({ success: false, message: `${blogs.title} cannot be empty` });
  } else {
    console.log(updateblog)
    for (let key in req.body) {
      if (req.body[key]) {
        spreadBlog[key] = req.body[key];
      }
    }
    console.log(spreadBlog)
    blogs.splice(findIndex, 1, spreadBlog);
    res.status(200).json({ success: true, message: 'update id' });
  }
});

module.exports = router;
