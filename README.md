# SharePad
[SharePad](https://sharepad.online/) is a simple web-based notepad application that allows users to create and share notes with others. With SharePad, you can create notes with different font styles, sizes, bold, italics, underline, and strikethrough options. The application is designed to be simple, fast, and easy to use, with no registration or login required.
<br/><br/>

## How It Works
To create a new note on SharePad, simply visit the website and enter a unique name (at least 6 characters) for your notepad, along with an optional password if you want to keep it private. Once you click on "Create", you will be taken to the notepad page where you can start typing your note. You can format the text using the various options available in the toolbar, and your changes will be saved automatically as you type.

Once you're done with your note, you can share the link with anyone you want to give access to the notepad. The notepad will remain available for 24 hours after the last access, after which it will be automatically deleted.
<br/><br/>

## Features
- Simple and fast notepad application
- No registration or login required
- Create notes with different font styles, sizes, bold, italics, underline, and strikethrough options
- Optional password protection for private notes
- Share notes with others easily by sharing the link
- Notes are automatically deleted 24 hours after the last access
<br/><br/>

## Getting Started
To get started with this code, simply clone this repository to your local machine:
```bash
git clone https://github.com/pratham-jaiswal/sharepad.git
```
<br/><br/>

## Library Prerequisites
1. Node.js
2. Express
3. EJS
4. BCrypt
5. Dotenv
6. Mongoose
7. Nodemon (optional)
    You can install these dependencies using npm:
    ```bash
    npm init
    npm install express ejs bcrypt dotenv mongoose nodemon
    ```
<br/><br/>

## Running the code
Firstly, connect your mongodb server. There are two ways to connect to a MongoDB server: locally and using an Atlas cluster.
1. Local MongoDB Server: In this approach, you install MongoDB directly on your local machine or a server within your own infrastructure. You start a MongoDB server instance on that machine, and your application can connect to the MongoDB server using the appropriate connection parameters (mongodb://localhost:`<port>`/`<database-name>`). Click [here](https://www.mongodb.com/docs/manual/) to read the MongoDB documentation. You can either use [MongoDb Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/) or [MongoDB Compass](https://www.mongodb.com/docs/compass/current/) (Recommended) to connect server.

2. MongoDB Atlas: MongoDB Atlas is a fully managed cloud-based MongoDB service. It provides a convenient and scalable way to host your MongoDB databases in the cloud without the need for managing the underlying infrastructure. You connect to your Atlas cluster using the provided connection string, which includes details like the hostnames, credentials, and other necessary configuration information (mongodb+srv://`<username>`:"+`<password>`+"@`<cluster-address>`/`<database-name>`). Click [here](https://www.mongodb.com/docs/atlas/) to read the MongoDB Atlas documentation.

Now, to run the code simply open your terminal/command prompt in that directory and run the following command,
```bash
node app.js
```

**OR** (Recommended)

Update the package.json file by setting the "main" property to "app.js":
```json
{
  ...
  "main": "app.js",
  ...
}
```

To avoid the need to manually stop and restart a Node.js application every time a change is made to the code, nodemon should be used. Open your terminal/command prompt in that directory and run the following command:
```bash
nodemon
```

This saves time and effort, allowing you to focus on writing code and testing it, rather than worrying about restarting the application.
<br/><br/>

## Test the website
After starting the node, open a browser, type "*localhost:3000*" and hit enter.
| ![Imgur](https://i.imgur.com/7WFiyKy.png) |
|:--:|
| <i>Homepage</i>|
<br/><br/>

| ![Imgur](https://i.imgur.com/579cX2Z.png) |
|:--:|
| <i>Unlock Password Protected Page</i>|
<br/><br/>

| ![Imgur](https://i.imgur.com/o337HGZ.png) |
|:--:|
| <i>SharePad Editor</i>|
<br/><br/>