# Counterforce

E-mails when someone force pushes to master.

# Setup

1. `cp lib/settings.js.example lib/settings.js` and fill in the appropriate values.

2. `npm install` then `npm start`

3. Add post-receive hooks to the repositories you want to monitor. See [here](http://help.github.com/post-receive-hooks/) for instructions.


# Disclaimers

E-mail is not guaranteed delivery. Github webhooks are not guaranteed delivery. My node-fu is weak.


I welcome suggestions for a better name.
