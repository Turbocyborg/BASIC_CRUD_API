import express from 'express'

const router = express.Router();

//using let to define array so we can overwrite in our delete post

 let posts = [
    {id:1, title: 'post1'},
    {id:2, title: 'post2'},
    {id:3, title: 'post3'},
 ];



 //Get All Posts
 router.get('/', (req,res)=>{
    const limit = parseInt(req.query.limit); //req.query is an object that contains the query parameters

    //if limit is a number and greater than 0, return only that many posts
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0,limit)); //slice returns a shallow copy of a portion of an array into a new array object
    }else{
        res.status(200).json(posts); //automatically sets the content-type to application/json
    }
 })

  //Get Single Posts
 router.get('/:id', (req,res)=>{
    const id = parseInt(req.params.id);//req.params is an object that contains the route parameters
    const post = posts.find((post)=>post.id === id); //find returns the first element in the array that satisfies the provided testing function
    if(!post){
        res.status(404).json({message:`A post with id ${id} not found`});
    }else{
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
    //res.json(posts.filter((post)=>post.id===id));//filter returns an array of posts that match the condition
 });

 //create a new post
 router.post('/',(req,res)=>{
    //console.log(req.body); //req.body is an object that contains the parsed body of the request
    //in express we dont need to turn it into JSON, it is done automatically by the body-parser middleware
    
    const newPost = {
        id: posts.length + 1, //simple way to generate a new id
        title: req.body.title //title is the only field we are accepting for now
    };

    if(!newPost.title){
        return res.status(400).json({message: 'Please Include a title'}); //400 Bad Request
    }

    posts.push(newPost); //push adds a new post to the posts array

    res.status(201).json(posts); //201 Created
 });

 // Update Post
 router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id);

    if(!post){
        res.status(404).json({message:`A post with id ${id} not found`});
    }else{
        post.title=req.body.title;
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
 })

 //Delete Post
  router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id);

    if(!post){
        res.status(404).json({message:`A post with id ${id} not found`});
    }else{
        //all posts except the post with the current id
        posts = posts.filter((post)=>post.id!==id);
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
 })

 export default router;