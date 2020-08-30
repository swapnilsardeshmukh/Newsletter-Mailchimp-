const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html")
})


app.post("/",function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

const data ={
    members: [ {
      email_address:email,
       status :"subscribed",
       merge_fields:{
         FNAME: firstName,
         LNAME: lastName
       }
    }]
}

app.post("/failure",function(req, res){
  res.redirect("/");
})

const jsonData=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/00085b362a";

const options ={
  method : "POST",
  auth: "850d5f94441144532445d9111c71f41811a4725b270f1776664b-us17"
}
const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
      }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
});
request.write(jsonData);
request.end();
});

//ListID
//00085b362a

//Mail Chimp
//850d5f94441144532445d9111c71f41811a4725b270f1776664b-us17
app.listen(process.env.PORT || 3000,function(){

console.log("Server Started ");

});
