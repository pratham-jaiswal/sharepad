# SharePad
SharePad is a simple web-based notepad application that allows users to create and share notes with others. With SharePad, you can create notes with different font styles, sizes, bold, italics, underline, and strikethrough options. The application is designed to be simple, fast, and easy to use, with no registration or login required.
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
6. Crypto
7. Nodemon (optional)
    You can install these dependencies using npm:
    ```bash
    npm init
    npm install express ejs bcrypt nodemon dotenv crypto
    ```
<br/><br/>

## Running the code
To run the code simply open your terminal/command prompt in that directory and run the following command,
```bash
node app.py
```
To avoid the need to manually stop and restart a Node.js application every time a change is made to the code, nodemon should be used. Open your terminal/command prompt in that directory and run the following command,
```bash
nodemon app.js
```
This saves time and effort, allowing you to focus on writing code and testing it, rather than worrying about restarting the application.
<br/><br/>

## Test the website
After starting the node, open a browser, type "*localhost:3000*" and hit enter.
| ![Imgur](https://i.imgur.com/Z0nOxgJ.png) |
|:--:|
| <i>Homepage</i>|
<br/><br/>

| ![Imgur](https://i.imgur.com/QmKW0QQ.png) |
|:--:|
| <i>Unlock Password Protected Page</i>|
<br/><br/>

| ![Imgur](https://i.imgur.com/OTsyxIa.png) |
|:--:|
| <i>SharePad Editor</i>|
<br/><br/>