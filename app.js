const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const routes = {};

routes[`test`] = {
    created: Date.now(),
    lastAccessed: Date.now(),
    password: null
};

app.get("/", (req, res) => {
    res.render("index", {req});
});

app.post('/', (req, res) => {
    var { routeName, password } = req.body;
    if (routeName.length < 6) {
        return res.status(400).send('Route name must be at least 6 characters long');
    }
    if (routeName in routes || routeName == 'test'){
        return res.status(400).send('Route already exists');
    }
    var saltRounds = parseInt(process.env.SALT_ROUNDS);
    let hashedPassword = null;
    if (password) {
        hashedPassword = bcrypt.hashSync(password, saltRounds);
    }
    routes[routeName] = {
        created: Date.now(),
        lastAccessed: Date.now(),
        password: hashedPassword
    };
    if(routes[routeName].password){
        res.render(`unlock`, {title: routeName, name: routeName, error: ''});
    }
    else{
        res.redirect(`/${routeName}`);   
    }
});

app.get('/terms', (req, res) => {
    res.render('terms.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/:routeName', (req, res) => {
    var { routeName } = req.params;
    if (!(routeName in routes)){
        return res.status(404).send('Route not found');
    }

    if(routes[routeName].password){
        var password = req.body.password || '';
        error = 'Please enter the correct password';
        if(!bcrypt.compareSync(password, routes[routeName].password)){
            if(password == ''){
                error = '';
            }
            return res.render('unlock', {title: routeName, name: routeName, error: error});
        }
    }

    var content  = req.body.notepad;
    routes[routeName].content = content;
    res.redirect(`/${routeName}`);
});

app.get('/:routeName', (req, res) => {
    var { routeName } = req.params;
    if (!(routeName in routes)){
        return res.status(404).send('Route not found');
    }

    routes[routeName].lastAccessed = Date.now();
    var title = `SharePad: ${routeName}`;
    var expiry = new Date(routes[routeName].lastAccessed + (24 * 60 * 60 * 1000)).toLocaleString();
    if(routeName == 'test'){
        routes[routeName].content = routes[routeName].content || 'Welcome to SharePad! SharePad is a simple and secure online notepad that allows you to easily share text and related content with others. SharePad offers a range of editing features such as font, size, bold, italics, underline, and strikethrough to enhance your writing experience. Our goal is to provide a fast, reliable, and secure platform for sharing information, without the need for databases, cookies, or user accounts.';
    }
    var content = routes[routeName].content;
    res.render('notepad', {title, name: routeName, expiry: expiry, content: content});
});

function deleteExpiredRoutes() {
  var now = Date.now();
  for (var [routeName, route] of Object.entries(routes)) {
    if (now - route.lastAccessed > 24 * 60 * 60 * 1000) {
      delete routes[routeName];
    }
  }
}
setInterval(deleteExpiredRoutes, 60 * 60 * 1000);

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
