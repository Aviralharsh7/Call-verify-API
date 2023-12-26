# Call-verify-API
 A REST api to be consumed by a mobile app, which is somewhat similar to various popular apps which tell you if a number is spam, or allow you to find a person’s name by searching for their phone number

 # Project setup 
 1. `npm install`
 2. setup .env file using .env_example file
 3. `npm start`

 ## Sign up 
 1. post: http://localhost:3000/auth/signup
 2. payload:
    {
      "name": "aviral yadav",
      "number": "1234567888",
      "password": "masterpassword",
      "confirmPassword": "masterpassword"
    }

## Sign in
1. post: http://localhost:3000/auth/signin
2. payload:
   {
     "number": "1234567888",
     "password": "masterpassword"
   }

## Search (by number)
1. get: http://localhost:3000/search/1234567888
2. set cookies from response object of signin 
- cookie name = jwt 

