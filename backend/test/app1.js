const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: 'public' })

const app = express();

app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.fieldname == "user")
                cb(null, 'public/img/user')
            else
                cb(null, 'public/img/plans')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
        }
      })
      
      const upload = multer({ storage: storage })


app.use("/photoUpload" ,upload.single('user'), function(req,res){
    // console.log(req);
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
});

app.listen(3000,function(){
    console.log('hi i listening');
})