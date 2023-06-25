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

## Connecting The Database
Firstly, connect your mongodb server. There are two ways to connect to a MongoDB server: locally and using an Atlas cluster.
1. Local MongoDB Server: In this approach, you install MongoDB directly on your local machine or a server within your own infrastructure. You start a MongoDB server instance on that machine, and your application can connect to the MongoDB server using the appropriate connection parameters (mongodb://localhost:`<port>`/`<database-name>`). Click [here](https://www.mongodb.com/docs/manual/) to read the MongoDB documentation. You can either use [MongoDb Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/) or [MongoDB Compass](https://www.mongodb.com/docs/compass/current/) (Recommended) to connect server.

2. MongoDB Atlas: MongoDB Atlas is a fully managed cloud-based MongoDB service. It provides a convenient and scalable way to host your MongoDB databases in the cloud without the need for managing the underlying infrastructure. You connect to your Atlas cluster using the provided connection string, which includes details like the hostnames, credentials, and other necessary configuration information (mongodb+srv://`<username>`:"+`<password>`+"@`<cluster-address>`/`<database-name>`). Click [here](https://www.mongodb.com/docs/atlas/) to read the MongoDB Atlas documentation.

<br/><br/>

## Starting localhost

To run your Node.js application on localhost, follow these steps:
1. Open your terminal or command prompt and navigate to the directory where your app.js file is located.
2. Run the following command to start the application:
    ```bash
    node app.js
    ```
    This will start your Node.js application, and it will be accessible at http://localhost:3000 (3000 or whichever port is specified).

**OR** (Recommended)

1. Update the package.json file by setting the "main" property to "app.js":
    ```json
    {
      ...
      "main": "app.js",
      ...
    }
    ```

2. To avoid the need to manually stop and restart a Node.js application every time a change is made to the code, nodemon should be used. Open your terminal/command prompt in that directory and run the following command:
    ```bash
    nodemon
    ```
    Nodemon will monitor your files for changes, and it will automatically restart the application whenever a change is detected. This saves you time and effort, allowing you to focus on writing code and testing it without the need for manual application restarts.

<br/><br/>

## Testing on localhost with ngrock
When testing on localhost, the visitor's IP is typically ::1 (IPv6 loopback address), which may result in the timezone not being detected correctly. To resolve this, you can use ngrok to create a public URL for your locally running Node.js application. Follow these steps:

1. **Download ngrok:** Visit the official website https://ngrok.com/download and download ngrok for your operating system.
2. **Extract ngrok:** Unzip the downloaded *ngrok.zip* file and extract the *ngrok.exe* executable.
3. **Start your Node.js application:** Ensure your Node.js application is running on localhost, using the desired port (e.g., port 3000).
4. **Run ngrock:** Double click on ngrok.exe file.
5. **Create a tunnel:** Execute the following command to create a tunnel and generate a public URL: (Replace 3000 with the port you are using to run the localhost)
    ```bash
    ngrok http 3000
    ```
6. **Copy the forwarding URL:** Once ngrok establishes the tunnel, it will display a line similar to the following in the terminal:
    ```bash
    Forwarding      http://a123-b234-c567.ngrok-free.app -> http://localhost:3000
    ```
    Copy the forwarding URL provided by ngrok (e.g., http://a123-b234-c567.ngrok-free.app).
7. **Test your application:** Open your preferred web browser and paste the ngrok forwarding URL into the address bar.

    > **Note:** Depending on your browser and security settings, you may encounter a warning about visiting the ngrok URL. Click on "Visit anyway" or a similar option to proceed to the website.

    By accessing the ngrok URL in your browser, you can now test your Node.js application as if it were running on a public server. Ngrok will forward incoming requests to your locally running application, enabling remote testing.

Using ngrok in this way simplifies the process of testing your application on localhost and allows you to validate its functionality under real-world conditions.

<br/><br/>

## Testing on localhost without ngrock

Instead of relying on ngrok, you have the option to manually provide either a timezone or a custom IP address. Here are the alternatives:
1. **Providing a timezone:** If you want to specify a timezone directly, you can use the following code (on line 173):
    ```js
    let timezone = (geoData && geoData.timezone) || "Asia/Kolkata";
    ```
    In the above example, "Asia/Kolkata" is set as the default timezone. You can replace it with the desired timezone.
2. **Providing a custom IP address:** If you prefer to provide a custom IP address, you can use the following code to obtain the corresponding geolocation data:
    ```js
    let geoData = geoip.lookup("103.224.182.250");
    ```
    In this example, "103.224.182.250" is used as the custom IP address representing Sydney, Australia. You can replace it with a valid desired IP address corresponding to the location you want to simulate.

<br/><br/>

## Screenshots
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