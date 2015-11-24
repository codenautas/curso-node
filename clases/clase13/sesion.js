module.exports={
    checkUser: function(req,res,next){
        if(!req.session.user){
            res.status(401).end();
            return;
        }
        next();
    }
};