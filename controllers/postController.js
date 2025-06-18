// @desc Get all posts
// @route GET /api/posts

 //using let to define array so we can overwrite in our delete post

 let posts = [
    {id:1, title: 'post1'},
    {id:2, title: 'post2'},
    {id:3, title: 'post3'},
 ];

 export const getPosts = (req,res,next)=>{
    const limit = parseInt(req.query.limit); //req.query is an object that contains the query parameters

    //if limit is a number and greater than 0, return only that many posts
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0,limit)); //slice returns a shallow copy of a portion of an array into a new array object
    }else{
        res.status(200).json(posts); //automatically sets the content-type to application/json
    }
 };

 // @desc Get single posts
 // @route /api/posts/:id

 export const getPost = (req,res,next)=>{
    const id = parseInt(req.params.id);//req.params is an object that contains the route parameters
    const post = posts.find((post)=>post.id === id); //find returns the first element in the array that satisfies the provided testing function
    if(!post){
        const error = new Error(`A post with id of ${id} was not found`);
        error.status=400;
        return next(error);
    }else{
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
    //res.json(posts.filter((post)=>post.id===id));//filter returns an array of posts that match the condition
 };

 // @desc Create new post
 // @route POST/api/posts

 export const createPost = (req,res,next)=>{
    //console.log(req.body); //req.body is an object that contains the parsed body of the request
    //in express we dont need to turn it into JSON, it is done automatically by the body-parser middleware
    
    const newPost = {
        id: posts.length + 1, //simple way to generate a new id
        title: req.body.title //title is the only field we are accepting for now
    };

    if(!newPost.title){
        const error = new Error(`Please Include A Title`);
        error.status=400;
        return next(error);
    }

    posts.push(newPost); //push adds a new post to the posts array

    res.status(201).json(posts); //201 Created
 }

 // @desc Update post
 // @route PUT /api/posts/:id

 export const updatePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id);

    if(!post){
        const error = new Error(`A post with id of ${id} was not found`);
        error.status=400;
        return next(error);
    }else{
        post.title=req.body.title;
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
 }

 // @desc Delete post
 // @route DELETE /api/posts

 export const deletePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id);

    if(!post){
        const error = new Error(`A post with id of ${id} was not found`);
        error.status=400;
        return next(error);
    }else{
        //all posts except the post with the current id
        //overwriting is easy since we declare array with let keyword
        posts = posts.filter((post)=>post.id!==id);
        res.status(200).json(post); //automatically sets the content-type to application/json
    }
 }