let express=require('express');
let plans=require('./db/plan.json');
let fs=require('fs');
const { v4: uuidv4 } = require('uuid');
 
const app=express();

app.use(express.json());

app.get('/plans/',(req,res)=>{
    res.status(200).json({
        mesagge:"succesfull",
        data:plans
    });
})

app.post('/plans/',(req,res)=>{
    let plan=req.body;
    plan.id=uuidv4();
    plans.push(plan);
    fs.writeFileSync('./db/plan.json',JSON.stringify(plans));
    res.status(201).json({
        message:"sucsses",
        data: plans
    })
})

app.delete('/plans/:id',function(req,res){
    let {id}=req.params
    let newPlans=plans.filter(function(plan){
        return id!=plan.id
    })
    // console.log(newPlans);
    if(plans.length!=newPlans.length){
        fs.writeFileSync('./db/plan.json',JSON.stringify(newPlans));
        plans=newPlans
        res.status(201).json({
            message:"succes",
            data: plans
        })
    }
    else{
        res.status(404).json({
            message:"non found",
            data: plans
        })
    }

})

app.patch('/plans/:id',function(req,res){
    let {id}=req.params;
    let upateObj=req.body
    let filterId=plans.filter(function(plan){
        return id==plan.id
    })
    if(filterId){
        let FilterId=filterId[0];
        for(key in upateObj){
            FilterId[key]=upateObj[key];
        }
        // console.log("jj",FilterId,"jkj");
        // console.log(plans);
        fs.writeFileSync('./db/plan.json',JSON.stringify(plans));
        res.status(201).json({
            message:"succes",
            data: plans
        })
    }
    else{
        res.status(404).json({
            message:"non found",
            data: plans
        })
    }
})
app.listen(3000, ()=>{
    console.log('app listening in 3000 port');
})