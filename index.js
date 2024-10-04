const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const { setSession, getSession } = require("./services/authService");
const database = require("./config/database");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
  if (req.cookies.uid) {
    const user = getSession(req.cookies.uid);
    if (!user) {
      res.clearCookie("uid");
      res.redirect("/login");
    } else {
      res.render("./pages/home", { title: "Home", error: null, user: user, sessionId: req.cookies.uid });
    }
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.render("./pages/register", {
        title: "Register",
        error: "All fields are required",
      });
      return;
    }
  
    const user = await User.findOne({ email });

    if (user) {
      res.render("./pages/register", {
        title: "Register",
        error: "User already exists",
      });
      return;
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  
    const uid = uuidv4();
    setSession(uid, newUser);
    res.cookie("uid", uid);
    res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("./pages/register", { title: "Register", error: null });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("./pages/login", {
      title: "Login",
      error: "All fields are required",
    });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.render("./pages/login", {
      title: "Login",
      error: "User does not exist",
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.render("./pages/login", {
      title: "Login",
      error: "Incorrect password",
    });
    return;
  }

  const uid = uuidv4();
  setSession(uid, user);
  res.cookie("uid", uid);
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("./pages/login", { title: "Login", error: null });
});
  
app.get("/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
});

database()
.then((conn) => {
    console.log("Connected to database: ", conn.connection.db.databaseName);
    app.listen(PORT, () => {
        console.log(`Server started on port http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});
