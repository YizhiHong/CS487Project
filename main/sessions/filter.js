/**
 * Created by Chi.Hong on 4/12/17.
 */
exports.authorize = function(req, res, next) {
    if(req.session._id) {
        if(req.session.level === 1 || req.session.level === 0){
            res.redirect('/staff/' + req.session._id);
        }else{
            res.redirect('/student/' + req.session._id);
        }
    }else {
       next();

       //  res.redirect('/login');
    }
};

exports.isLogined = function (req,res,next) {
    return !!(req.session._id);
}

exports.authorizeIndex = function(req, res, next) {
    if(req.session._id) {
        if(req.session.level === 1 || req.session.level === 0){
            res.redirect('/staff/' + req.session._id);
        }else{
            res.redirect('/student/' + req.session._id);
        }
    }else{
        next();
    }
};