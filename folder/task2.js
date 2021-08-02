var display;
const express=require('express');
const app = express();
const fetch = require('node-fetch');
const url="https://breakingbadapi.com/api/characters"
console.log(url);  


app.listen(3000,function(){
    console.log("server 3000 is active");
})

app.get("/",function(req,res){
    fetch(url)
    .then(function(response){
        if(response.status!=200){
            alert("looks like some error.Status Code: " + response.status)
            
            return;
        }
        
        response.json().then(function(data) {
            // console.log(data)
            
            console.log(data.length)
            var length=data.length;
            for(var i=0;i<length;i++){
                display=data[i].name
                console.log(display)
              
            }
            console.log("  "); 
            console.log("BETTER CALL SAUL:");
            for(var i=0;i<length;i++){
                if(data[i].better_call_saul_appearance.length!=0)
                {
                    var name=data[i].name;
                    var status=data[i].status;
                    var portrayed=data[i].portrayed;

                    console.log("Name: "+name);
                    console.log("status: "+status);
                    console.log("portrayed: "+portrayed);
                    console.log(" ");

                }         
            } 
            // for(var i=0;i<length;i++){
            //     if(data[i].better_call_saul_appearance.length!=0)
            //     {
            //         console.log(data[i]);
            //     }         
            // }  
        })
        .catch(function(err){
            console.log("oops");
        })
   
        
        res.send("Check console");




})
})

