var express = require("express");
var nodemailer = require("nodemailer");
var settings = require("./settings");
var util = require("util");

var app = express.createServer(express.logger());

var smtp_transport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: settings.smtp_user,
    pass: settings.smtp_pass
  }
});


function check_commit(req, res) {
  var forced;
  var payload;
  var mail_opts = {
    from: settings.smtp_user,
    to: settings.recipients
  };

  res.send("Cool story, bro.");
  console.log(req.body);

  if (!req.body || !req.body.payload) {
    console.log("No request payload.");
    return;
  }

  payload = JSON.parse(req.body.payload);
  console.log(payload);

  if (!payload) {
    console.log("No payload or error parsing it.");
    return;
  }
  if (!payload.forced) {
    console.log("Push wasn't forced.");
    return;
  }
  if (settings.bad_refs.indexOf(payload.ref) === -1) {
    console.log("Push was forced, but ref", payload.ref, "isn't on the list.");
    return;
  }

  console.log(payload.pusher.name, "has forced a push to", payload.ref);

  mail_opts.subject = util.format("%s: push forced to master", payload.repository.name);
  mail_opts.text = util.format(
    "User %s forced a push to ref %s in repo %s. Head is now at %s from %s. Compare %s",
    payload.pusher.name, payload.ref, payload.repository.name, payload.head_commit.url,
    payload.head_commit.timestamp, payload.compare
  );

  smtp_transport.sendMail(mail_opts, function(error, response) {
    if (error) {
      console.log(error);
    }
    else{
      console.log("Message sent:", response.message);
    }
  });
}


app.use(express.bodyParser());
app.post("/", check_commit);

console.log("Listening on port", settings.port);
app.listen(settings.port);
