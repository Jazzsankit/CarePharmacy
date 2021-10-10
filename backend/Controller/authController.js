const userModel = require("../Model/usersModel");
const { SECRET_KEY } = require("../secrets/secret");
const jwt = require('jsonwebtoken')

async function signUp(req, res) {
    try {
        let user = req.body;
        let createUser = await userModel.create({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            role: user.role
        });
        console.log(createUser)
        res.status(200).json({
            message: "User Created Succesfully",
            data: createUser
        })
    }
    catch (error) {
        res.status(501).json({
            message: "Failed to create a user",
            error: error
        })
    }
}
async function login(req, res) {
    try {
        let { email, password } = req.body;
        console.log(email, password);
        let loggedInUser = await userModel.find({ email: email });
        if (loggedInUser.length) {
            let user = loggedInUser[0];
            if (user.password == password) {
                const token = jwt.sign({ id: user["_id"] }, SECRET_KEY);
                res.status(200).json({
                    message: "Logged in succesfully !!",
                    data: loggedInUser[0],
                    token
                })
            }
            else {
                res.status(501).json({
                    message: "Email and Password didn't Matched !!",
                })
            }
        }
        else {
            res.status(501).json({
                message: "No User Found SignUp First",
            })
        }
    }
    catch (error) {
        res.status(501).json({
            message: "Login Failed !!",
            error
        })
    }
}

async function protectRoute(req, res, next) {
    try {
        // console.log("hjjh")
        const token = req.headers.authorization.split(" ").pop();
        // console.log(token);
        const payload = jwt.verify(token, SECRET_KEY);
        if (payload) {
            req.id = payload.id
            next();
        }
        else {
            res.status(501).json({
                message: "Pls Login First",
            })
        }
    } catch (error) {
        res.status(501).json({
            message: "Error in protectRoute"
        })
    }

}

async function isAuthorize(req, res, next) {
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        console.log(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(501).json({
                message: "Not Atthorize"
            })
        }
    } catch (error) {
        res.status(501).json({
            message: "Error in isAuthorize"
        })
    }
}

async function forgetPassword(req, res) {
    try {
        let { email } = req.body;
        let user = await userModel.findOne({ email: email });
        console.log(user)
        if (user) {
            // pwToken
            // timeset
            let token = user.createResetToken();
            console.log(token);
            await user.save({ validateBeforeSave: false });
            // console.log(updatedUser);
            let resetLink = `http://localhost:3000/api/user/resetpassword/${token}`;
            res.json({
                message: "Reset Link is sent to email",
                resetLink,
            })
        }
        else {
            res.status(404).json({
                message: "User Not Found ! Please Sign up first !"
            })
        }
    }
    catch (error) {
        res.status(501).json({
            message: "Failed to forget Password",
            error
        })
    }
}

async function resetPasswword(req,res){
    try{
        const token = req.params.token;
        const {password , confirmPassword} = req.body;
        const user = await userModel.findOne({
          pwToken:token,
          tokenTime:{  $gt : Date.now() }
        })
        console.log(user);
        console.log(password , confirmPassword);
        if(user){
          user.resetPasswordHandler(password , confirmPassword);
          await user.save();
          res.status(200).json({
            message:"Password Reset Succesfull !!!"
          })
        }
        else{
          res.status(200).json({
            message:"Password Reset Link Expired !!!"
          })
        }
      }
      catch(error){
        res.status(404).json({
          message:"Failed to reset password",
          error
        })
      }
}

module.exports.isAuthorize = isAuthorize;
module.exports.protectRoute = protectRoute;
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPasswword = resetPasswword;