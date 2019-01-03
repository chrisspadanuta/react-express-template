# react-express-template

# Running:

`npm install`
`npm start`

or 

`yarn install`
`yarn start`

# Validation:

* Admin: The page will only allow the user to submit if each question has a question filled out, no blank choices, and a correct answer chosen.
* Poll: The page will only allow the user to submit if each question has a chosen answer.
* Results: Click polls to expand and collapse them.

# Backend:

Polls and poll results are saved in a variable on the server, not in a real DB.  They'll be lost when the server is shutdown.
