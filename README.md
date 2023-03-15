# Node & Express Projects
# [Node.js / Express Course - Build 4 Projects => freeCodeCamp: YouTube](https://www.youtube.com/watch?v=qwfE7fSVaZM)

1. Task Manager
    - .env should be created at the ROOT directory of the project
2. Store API
    - products controller mongoDB numericFilter logic is nice code snippet
3. JWT Basics
    - auth middleware
        - jwt.sign()
        - jwt.verify()
4. Jobs API
    - authentication
        - bcrypt.genSalt(10)            // 10 is default - safe enough
        - bcrypt.hash(password, salt)

[.env]

- MONGO_URI
- JWT_SECRET [All keys generator -> To create more secure keys](https://www.allkeysgenerator.com/)