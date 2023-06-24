const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
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
  let expiry = new Date(
    findNote.lastAccessed + 24 * 60 * 60 * 1000
  ).toLocaleString();
  findNote.save();

  let content = findNote.content;
  res.render("notepad", {
    name: noteName,
    expiry: expiry,
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
  const expiryDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);

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
