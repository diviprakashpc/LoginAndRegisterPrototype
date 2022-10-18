const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDb = require("./utils/connectDb.js");
const expressSession = require("express-session");

const {
  intializingPassport,
} = require("./Middlewares/initializingPassport.js");
const app = express();

connectDb();
intializingPassport(passport);
dotenv.config();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/",(req,res)=>{
  res.render("home");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start at Port ${PORT}`));
