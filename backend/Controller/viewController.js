const planModel = require("../Model/plansModel");

// function getDemoPage(req , res){
//     // send demo page to client
//     res.render("demo.pug");
// }
function getHomePage(req , res){
    res.render("home.pug",{name:req.name});
}
function getLoginPage(req,res){
    res.render("login.pug",{name:req.name});
}
async function getPlansPage(req,res){
    try{
        let plans = await planModel.find(); 
        // console.log(plans);
        res.render("plans.pug" ,{name:req.name,plans:plans})
    }
    catch(error){
        console.log(error);
    }
}


// module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getPlansPage = getPlansPage;