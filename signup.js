
const express=require('express');
const app = express();
const https=require("https")
const bodyParser=require("body-parser");
const request=require("request");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("Data"));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
})
app.listen(process.env.PORT || 3000,function(){
    // process env is used to take random server through heroku
    console.log("server 3000 is active");
})
app.post("/",function(req,res){
    var firstName=req.body.f1;
    var lastName=req.body.l1;
    var email=req.body.email;
    console.log(firstName,lastName,email);
    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    // const url="https://${dc}.api.mailchimp.com/3.0/lists/04ca3a4e8f"
    const url="https://us6.api.mailchimp.com/3.0/lists/04ca3a4e8f";
    const jsonData=JSON.stringify(data);
    const options={
        method:"POST",
        auth:"bhumi:8648054ff509452d68fe6a96c43e7cdc-us6" 

    }
const request=https.request(url,options,function(response){
if(response.statusCode===200)
{
    res.sendFile(__dirname+"/signup_success.html")
}
else
{
    res.sendFile(__dirname+"/signup_failure.html")

}
    response.on("data",function(data){
    // console.log(JSON.parse(data));
})
    })
    request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res){
    // redirect is used to go back to a page
    res.redirect("/"); 
})
// 8648054ff509452d68fe6a96c43e7cdc-us6
// 04ca3a4e8f