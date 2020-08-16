const express = require('express');
const parser = require('body-parser');
const https = require('https');
const app = express();


app.use(parser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//Key API
//73fe28a010c0236aa550ea274a1fb761-us17


//List ID
//8b604b373d

app.post('/', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    console.log(firstname);

    const data = {
        members : [{
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : firstname,
                LNAME : lastname
            }
        }
        ]
    }

    const jsondata = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/8b604b373d"
    const options = {
        method : "POST",
        auth: ""
    }
    const request = https.request(url, options,(response) =>{

        if (response.statusCode == "200"  ){
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failed.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    } )
    request.write(jsondata)
    request.end();
})


app.listen(3000, () => {
    console.log("Successfully established")
})