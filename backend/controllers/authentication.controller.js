exports.login = function(req, res, next) {
    let response = {
        redirect: '/admin'
    };
    
    res.json(response);
};

exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');  
};
