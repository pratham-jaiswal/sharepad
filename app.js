const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const geoip = require('geoip-lite');
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://pratham:"+process.env.PASSWORD+"@projects.aymrzso.mongodb.net/sharepadDB");
// mongoose.connect("mongodb://localhost:27017/sharepadDB"); // for testing locally

const notesSchema = {
  name: {
    type: String,
    required: true,
  },
  created: Date,
  lastAccessed: Date,
  content: String,
  password: String,
};

const Note = mongoose.model("Note", notesSchema);

app.get("/", (req, res) => {
  res.render("index", { req, error: "" });
});

app.post("/", async function (req, res) {
  let { noteName, password } = req.body;
  if (noteName.length < 6) {
    return res.status(400).render("index", {
      req,
      error: "SharePad name must be at least 6 characters long",
    });
  }
  let findNote;
  try {
    findNote = await Note.findOne({ name: noteName }).exec();
  } catch (err) {
    console.log(err);
  }
  if (findNote) {
    return res.status(400).render("index", {
      req,
      error: "SharePad " + noteName + " already exists",
    });
  }

  let saltRounds = parseInt(process.env.SALT_ROUNDS);
  let hashedPassword = null;
  if (password) {
    hashedPassword = bcrypt.hashSync(password, saltRounds);
  }

  let newNote = new Note({
    name: noteName,
    created: Date.now(),
    lastAccessed: Date.now(),
    content: null,
    password: hashedPassword,
  })
  newNote.save();

  if (password) {
    return res.render(`unlock`, {
      name: noteName,
      error: "",
    });
  } else {
    return res.redirect(`/${noteName}`);
  }
});

app.get("/terms", (req, res) => {
  res.render("terms.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/:noteName", async function (req, res) {
  let { noteName } = req.params;

  let findNote;
  try {
    findNote = await Note.findOne({ name: noteName }).exec();
  } catch (err) {
    console.log(err);
  }

  if (!findNote) {
    return res.status(404).render("404");
  }
  
  if (findNote.password) {
    let password = req.body.password || "";
    error = "Please enter the correct password";
    if (!bcrypt.compareSync(password, findNote.password)) {
      return res.render("unlock", {
        name: noteName,
        error: error,
      });
    }

    return res.redirect(`/${noteName}?v=` + findNote.password);
  }
  res.redirect(`/${noteName}`);
});

app.get("/:noteName", async function (req, res) {
  let { noteName } = req.params;
  
  let findNote;
  try {
    findNote = await Note.findOne({ name: noteName }).exec();
  } catch (err) {
    console.log(err);
  }

  if (!findNote) {
    return res.status(404).render("404");
  }

  if (findNote.password) {
    const v = req.query.v;
    if (!v) {
      return res.render("unlock", {
        name: noteName,
        error: "",
      });
    }
    else if (v != findNote.password) {
      return res.render("unlock", {
        name: noteName,
        error: "Please enter the correct password",
      });
    }
  }

  findNote.lastAccessed = Date.now();
  findNote.save();

  let visitorIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "103.224.182.250";
  let geoData = geoip.lookup(visitorIP); // geoip.lookup("103.224.182.250")

  /* When testing on localhost visitor ip is ::1 so the timezone is not detected. 
    Download ngrok from https://ngrok.com/download.
    Extract ngrok.exe out from ngrok.zip.
    Start nodejs application on localhost.
    Double click on ngrok.exe and run the following command: ngrok http 3000
    Then a link like this will be provided to you: https://a123-b234-c567.ngrok-free.app
    Open the link in your browser, and your app is ready for testing.

    OR

    You can just provide a timezone like I did below: "Asia/Kolkata".

    OR

    You can just provide a custom ip like I did above: "103.224.182.250" (Location: Sydney, Australia).
  */

  let timezone = (geoData && geoData.timezone) || "Asia/Kolkata";

  let expiry = new Date(findNote.lastAccessed);
  expiry.setDate(expiry.getDate() + 1);
  let formattedExpiry = expiry.toLocaleString('en-IN', { timeZone: timezone});

  let content = findNote.content;
  res.render("notepad", {
    name: noteName,
    expiry: formattedExpiry,
    content: content,
  });
});

app.put("/:noteName", async function (req, res) {
  let { noteName } = req.params;
  let findNote;
  try {
    await Note.findOneAndUpdate(
      { name: noteName },
      { content: req.body.content },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if(!findNote){
    return res.status(404).render("404");
  }
  console.log(findNote.content);
  console.log(req.body.content+"\n\n");
});

async function deleteExpiredNotes() {
  let now = Date.now();
  const expiryDate = new Date(now - 24 * 60 * 60 * 1000);

  try {
    await Note.deleteMany({ name: { $ne: "welcome" }, lastAccessed: { $lt: expiryDate } });
  } catch (err) {
    console.log(err);
  }  
}

setInterval(deleteExpiredNotes, 15 * 60 * 1000);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
