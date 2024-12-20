const port = 4329;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const path=require('path');
app.use(express.static(path.join(__dirname,"")));

let points=[];

app.get('/point',(req,res) => {
res.status(200).json(points);
});

app.post('/point',(req,res) => {
    let ThisPoint={};
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    points.push(ThisPoint);
    res.status(200).json("נקודה נוספה");
});

app.put('/point',(req,res) => {
    let ThisPoint={};
    let idx=req.body.idx;
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    points[idx]=ThisPoint;
    res.status(200).json("נקודה עודכנה");
});

app.delete('/point',(req,res) => {
    let idx=req.body.myid;
    points.splice(idx,1)
    res.status(200).json(points);
});

let pointsVisited=[];

app.get('/pointVisited',(req,res) => {
res.status(200).json(pointsVisited);
});

app.post('/pointVisited',(req,res) => {
    const guardingTime=new Date()+180;
    let ThisPoint={};
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    ThisPoint.time=guardingTime;
    pointsVisited.push(ThisPoint);
    res.status(200).json("נקודה נוספה");
});

app.put('/pointVisited',(req,res) => {
    const guardingTime=new Date()+180;
    let ThisPoint={};
    let idx=req.body.idx;
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    ThisPoint.time=guardingTime;
    pointsVisited[idx]=ThisPoint;
    res.status(200).json("נקודה עודכנה");
});

app.delete('/pointVisited',(req,res) => {
    let idx=req.body.myid;
    pointsVisited.splice(idx,1)
    res.status(200).json(pointsVisited);
});

app.get('/admin',(req,res) => {
    res.status(200).sendFile(path.join(__dirname,"/nodeJS_final.html"));
    });

app.get('/admin2',(req,res) => {
    res.status(200).sendFile(path.join(__dirname,"/nodeJS_final_part2.html"));
    });

app.get('/',(req,res) => {
res.status(200).sendFile(path.join(__dirname,"/nodeJS_final.html"));
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});