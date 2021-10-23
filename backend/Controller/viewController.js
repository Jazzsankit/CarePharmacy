function getDemoPage(req , res){
    // send demo page to client
    res.render("demo.pug");
}
function getHomePage(req , res){
    res.render("home.pug");
}
function getLoginPage(req,res){
    res.render("login.pug");
}


module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;