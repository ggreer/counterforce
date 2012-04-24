var express = require('express');
var nodemailer = require("nodemailer");
var settings = require('./settings');

var app = express.createServer(express.logger());

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: settings.smtp_user,
        pass: settings.smtp_pass
    }
});

function check_commit(req, res) {
  var forced;
  var payload;

  res.send('cool story, bro');
  console.log(req.body);

  if (req.body && req.body.payload) {
    payload = JSON.parse(req.body.payload);
    console.log(payload);
    if (payload.forced) {
      console.log("OH SHIIIIIIIIIT user", payload.pusher.name, "has forced a push");
      console.log("compare at ", payload.compare);
      var mailOptions = {
          from: settings.smtp_user,
          to: settings.recipients,
          subject: "",
          text: "User "
      };

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
              console.log(error);
          }else{
              console.log("Message sent: " + response.message);
          }

          // if you don't want to use this transport object anymore, uncomment following line
          //smtpTransport.close(); // shut down the connection pool, no more messages
      });
    }
    else {
      console.log("no forced push. user", payload.pusher.name, "is ok.");
    }
  }
}

app.use(express.bodyParser());
app.get('/', check_commit);
app.post('/', check_commit);

console.log('listening on port', settings.port);
app.listen(settings.port);
