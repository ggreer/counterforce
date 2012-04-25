# Counterforce

E-mails when someone force pushes to master.

# Setup

1. `cp settings.js.example settings.js` and fill in the appropriate values.

2. `npm install` then `npm start`

3. Add a post-receive hook to the repository you want to monitor. See [here](http://help.github.com/post-receive-hooks/) for instructions.


# Disclaimers

E-mail is not guaranteed delivery. Github webhooks are not guaranteed delivery. My node-fu is weak.


I welcome suggestions for a better name.
