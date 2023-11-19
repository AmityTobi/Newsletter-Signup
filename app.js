const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
  
  const data =  {
        
    members:[
        {
          "email_address": email,
          "status": "subscribed",
          "merge_fields":{

            FNAME: firstName,
            LNAME: lastName
          } 
        }
      ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/54e0d2b7df"
    const option ={
        method: "POST",
        auth: "Amity:994cae3156d7b53e01822383a6389de1-us11"
    }
   const request = https.request(url, option, function (response){

    if(response.statusCode===200){

        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function (data){

        console.log(JSON.parse(data));
    })

    })

    request.write(jsonData);
    request.end();

    console.log(res.statusCode);

});

app.post("/failure", function (req, res){

    res.redirect("/");
})
  



app.listen(process.env.PORT || 3000,(req, res) => {
    
    console.log("server is running on port 3000"); 

});











