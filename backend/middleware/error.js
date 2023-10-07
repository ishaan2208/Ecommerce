const Errorhandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Interval server Error";

    //* Wrong MongoDB ID error
    
    if (err.name === "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`
        err = new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({ 
        success:false,
        message:err.message,
    })
}