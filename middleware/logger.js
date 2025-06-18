 const logger = (req,res,next) =>{
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
    next();//call next piece of middleware
 
}

export default logger;