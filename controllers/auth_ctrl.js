var exports = module.exports = {}
 
exports.signup = function(req, res) {

    res.render('mainPage');
   
 
}
exports.signin = function(req, res) {
 
    res.render('mainPage');
}
exports.peoplepage = function(req,res){
    res.render('peoplePage')
}
exports.primaryprofile = function(req, res) {
    
    res.render('primaryProfile', {firstName: req.user.firstName,
    lastName: req.user.lastName,
    email:req.user.email,
});
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}