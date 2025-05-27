# Hangman

## Backend Installatie

npm install
npm run dev of node server.js

## 🔐 Register and Login

POST /register
Registreert een nieuwe gebruiker.

Body:
`{
  "username": "test",
  "email": "test@test.com",
  "password": "test"
}`
POST /login
Logt een gebruiker in en retourneert een JWT-token.

Body:
`{
  "email": "test@test.com",
  "password": "test"
}`
Response:
`{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "USER_ID",
    "email": "test@test.com",
    "username": "test"
  }
}`

## Create and find a words

GET /
you get all the words

POST /create

Body:
`{
    "word": "Nikita",
    "public": true
}`
Heaader:
`{
    "Authorization": "Bearer JWT_TOKEN_HERE"
}`

