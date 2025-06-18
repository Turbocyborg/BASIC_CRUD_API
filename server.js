// const express = require('express'); // commonjs style
 import express from 'express';
 import path, { parse } from 'path';
 import posts from './routes/posts.js'; // Importing posts route
 import logger from './middleware/logger.js'
 import notFound from './middleware/notFound.js';
 import errorHandler from './middleware/error.js';
 import { fileURLToPath } from 'url';

 const port = process.env.PORT || 3000;
// Using ES Module syntax

 //__dirname is not available by default in ES Module context. You'll need to define it manually
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 const app = express();

 //BODY PARSER MIDDLEWARE
 app.use(express.json()); // for parsing raw application/json
 app.use(express.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
 
 //logger middleware
 app.use(logger);

 //setup static folder to serve static files
 //middleware -> function that runs between the incoming request and outgoing response
 //middle helps to remove route definitions for static files
  app.use(express.static(path.join(__dirname, 'public')));
 
//Routes
app.use('/api/posts',posts);

//catch all errors
app.use(notFound);
// app.use((req, res, next)=> {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

//Error Handler
app.use(errorHandler);

//now we don't need to define routes for static files like CSS, JS, images, etc.

//  app.get('/', (req,res)=> {
//     //no need to define content-type, express does it automatically
//     // res.setHeader('Content-Type', 'application/json'); // not needed
//     //We'll use sendfile to send HTML files to the client
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//  });

//  app.get('/about', (req,res)=> {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
//  });

 app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
 });