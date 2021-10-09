const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const nodemailer = require("nodemailer");

const app = express();

// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use( express.json());

// async function sendMail(){

//   let transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "465ba3bcb12bfe",
//       pass: "68f5d6f7c57b96"
//     }
//   });

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });


// }

// sendMail()


// app.httpMethod( appRoute , cb function( request , response   )      )
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);

app.listen(3000, function () {
  console.log("server started at port 3000");
});