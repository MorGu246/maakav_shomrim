const port = 4329;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const path=require('path');
app.use(express.static(path.join(__dirname,"")));

let points=[];

app.get('/pointslist',(req,res) => {
res.status(200).json(points);
});

app.post('/Addpoint',(req,res) => {
    let ThisPoint={};
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    ThisPoint.time=req.body.time;
    points.push(ThisPoint);
    res.status(200).json("נקודה נוספה");
});

app.patch('/Editpoint/:idx',(req,res) => {
    let ThisPoint={};
    let idx=req.params.idx;
    ThisPoint.name=req.body.name;
    ThisPoint.num=req.body.num;
    ThisPoint.time=req.body.time;
    points[idx]=ThisPoint;
    res.status(200).json("נקודה עודכנה");
});

app.delete('/Deletepoint/:myid',(req,res) => {
    let idx=req.params.myid;
    points.splice(idx,1)
    res.status(200).json(points);
});

app.get('/admin',(req,res) => {
res.status(200).sendFile(path.join(__dirname,"/nodeJS_final.html"));
});

app.get('/',(req,res) => {
res.status(200).sendFile(path.join(__dirname,"/nodeJS_final.html"));
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});