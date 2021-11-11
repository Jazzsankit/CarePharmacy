const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public' })

const app = express();

app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/photoUpload" ,upload.single('photo'), function(req,res){
    // console.log(req);
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
});

app.listen(3000,function(){
    console.log('hi i listening');
})