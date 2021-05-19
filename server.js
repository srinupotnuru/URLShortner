var express=require('express')
var app=express();
var bp=require('body-parser');
var md4=require('md5');
var fs=require('fs');
const PORT=2104
app.use(bp.json());

app.use(express.static("static"));



app.post("/short",(req,res)=>{
    let key=md4(req.body.url).toString();
    let data=JSON.parse(fs.readFileSync("data.json"));
    data[key]=req.body.url;
    fs.writeFileSync("data.json",JSON.stringify(data));
    res.send({result:key});
})
app.listen(PORT,console.log("running at 2104"));