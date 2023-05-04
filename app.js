const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const routes = {};

app.get("/", (req, res) => {
    res.render("index", {req});
});

app.post('/', (req, res) => {
    const { routeName, password } = req.body;
    if (routeName.length < 6) {
        return res.status(400).send('Route name must be at least 6 characters long');
    }
    if (routeName in routes) {
        return res.status(400).send('Route already exists');
    }
    const saltRounds = 10;
    let hashedPassword = null;
    if (password) {
        hashedPassword = bcrypt.hashSync(password, saltRounds);
    }
    routes[routeName] = {
        created: Date.now(),
        lastAccessed: Date.now(),
        password: hashedPassword
    };
    if(password){
        res.redirect(`/${routeName}?password=${password}`);
    }
    else{
        res.redirect(`/${routeName}`);
    }
});

app.get('/test', (req, res) => {
    const currTime = new Date();
    const expiry = new Date(currTime.getTime() + (24 * 60 * 60 * 1000)).toLocaleString();
    res.render('notepad', {title: "Route: test", name: "test", expiry: expiry});
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
    const { routeName } = req.params;
    if (!(routeName in routes)){
        return res.status(404).send('Route not found');
    }
    const content  = req.body.notepad;
    console.log(content);
    routes[routeName].content = content;
    res.redirect(`/${routeName}`);
});

app.get('/:routeName', (req, res) => {
    const { routeName } = req.params;
    if (!(routeName in routes)){
        return res.status(404).send('Route not found');
    }
    const { password } = req.query || null;;
    if (routes[routeName].password){
        if(!password || !bcrypt.compareSync(password, routes[routeName].password)){
            return res.status(401).send('Unauthorized!! Enter Valid Password');
        }
    }
    routes[routeName].lastAccessed = Date.now();
    const title = `Route: ${routeName}`;
    const expiry = new Date(routes[routeName].lastAccessed + (24 * 60 * 60 * 1000)).toLocaleString();
    const content = routes[routeName].content;
    res.render('notepad', {title, name: routeName, expiry: expiry, content: content});
});

function deleteExpiredRoutes() {
  const now = Date.now();
  for (const [routeName, route] of Object.entries(routes)) {
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
