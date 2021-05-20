var express=require('express')
var app=express();
var bp=require('body-parser');
var md4=require('md5');
var fs=require('fs');
var shortid=require('shortid');  
const PORT=2104
app.use(bp.json());

app.use(express.static("static"));

app.get("/:id",(req,res)=>{
    var data={};
    data=JSON.parse(fs.readFileSync("data.json"));
    if(data.hasOwnProperty(req.params.id))
    {
        res.send(`
        <html>
        <body>
            <script>
                window.location.href= "${data[req.params.id]}" ;
            </script>
        </body>global.
    </html>
        `);
    }
    else 
    {
        res.send(`
        <html>
        <body>
            <h1>404 error!<h1>
        </body>global.
    </html>
        `);
    }
});
app.post("/short",(req,res)=>{
    
    let key=shortid.generate();
    let data=JSON.parse(fs.readFileSync("data.json"));
    data[key]=req.body.url;
    fs.writeFileSync("data.json",JSON.stringify(data));
    res.send({result:key});


})
app.listen(PORT,console.log("running at 2104"));